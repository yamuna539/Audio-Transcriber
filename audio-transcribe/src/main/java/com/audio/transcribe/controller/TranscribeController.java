package com.audio.transcribe.controller;

import com.audio.transcribe.service.GeminiTranscribeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class TranscribeController {
//controller class
    private final GeminiTranscribeService service;

    public TranscribeController(GeminiTranscribeService service) {
        this.service = service;
    }

    @PostMapping("/transcribe")
    public ResponseEntity<?> transcribe(@RequestParam("file") MultipartFile file) {
        try {
            String transcription = service.transcribeInlineIfSmall(file);
            return ResponseEntity.ok().body(new TranscriptionResult(transcription));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new TranscriptionResult("Error: " + e.getMessage()));
        }
    }

    // Simple response POJO
    record TranscriptionResult(String transcription) {}
}
