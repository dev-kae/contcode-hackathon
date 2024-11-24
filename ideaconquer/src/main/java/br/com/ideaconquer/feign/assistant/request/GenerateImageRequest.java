package br.com.ideaconquer.feign.assistant.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GenerateImageRequest {
    @JsonProperty("promt")
    private String prompt;
    private Integer quantity;
}
