package com.audio.transcribe.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Base64;
import java.util.Iterator;

@Service
public class GeminiTranscribeService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.generate.url}")
    private String generateUrl;

    @Value("${transcribe.max-inline-bytes}")
    private long maxInlineBytes;

    private final ObjectMapper mapper = new ObjectMapper();

    public String transcribeInlineIfSmall(MultipartFile file) throws Exception {
        long size = file.getSize();
        if (size > maxInlineBytes) {
            throw new IllegalArgumentException("File too large for inline upload. Use resumable upload.");
        }

        byte[] bytes = file.getBytes();
        String base64 = Base64.getEncoder().encodeToString(bytes);

        // Build JSON request
        var root = mapper.createObjectNode();
        var contents = root.putArray("contents");
        var contentObj = contents.addObject();
        var parts = contentObj.putArray("parts");

        parts.addObject().put("text", "Please transcribe this audio completely.");
        var inlineData = parts.addObject().putObject("inlineData");
        inlineData.put("mimeType", file.getContentType() == null ? "audio/mpeg" : file.getContentType());
        inlineData.put("data", base64);

        String requestJson = mapper.writeValueAsString(root);

        HttpRequest req = HttpRequest.newBuilder()
                .uri(URI.create(generateUrl))
                .header("Content-Type", "application/json")
                .header("x-goog-api-key", apiKey)
                .POST(HttpRequest.BodyPublishers.ofString(requestJson))
                .build();

        HttpClient client = HttpClient.newHttpClient();
        HttpResponse<String> resp = client.send(req, HttpResponse.BodyHandlers.ofString());

        if (resp.statusCode() >= 300) {
            throw new RuntimeException("Gemini API error " + resp.statusCode() + ": " + resp.body());
        }

        JsonNode rootResp = mapper.readTree(resp.body());
        StringBuilder out = new StringBuilder();

        if (rootResp.has("candidates")) {
            for (JsonNode cand : rootResp.get("candidates")) {
                JsonNode partsResp = cand.path("content").path("parts");
                for (JsonNode p : partsResp) {
                    if (p.has("text")) out.append(p.get("text").asText());
                }
            }
        } else {
            return resp.body();
        }

        return out.toString().trim();
    }

}
