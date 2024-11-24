package br.com.ideaconquer.feign.assistant;

import br.com.ideaconquer.feign.assistant.request.GenerateImageRequest;
import br.com.ideaconquer.feign.assistant.request.SendAssistantMessageRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(value = "openaiClient", url = "${spring.application.assistant.url}")
public interface OpenAiClient {
    @PostMapping("/threads/runs")
    ResponseEntity<?> sendAssistantMessage(@RequestBody SendAssistantMessageRequest request);

    @PostMapping("/image/logo")
    ResponseEntity<List<String>> generateImage(@RequestBody GenerateImageRequest request);
}
