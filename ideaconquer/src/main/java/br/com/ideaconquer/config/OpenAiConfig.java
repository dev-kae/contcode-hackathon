package br.com.ideaconquer.config;

import io.github.sashirestela.openai.SimpleOpenAI;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenAiConfig {

    @Bean
    public SimpleOpenAI simpleOpenAI() {
        return SimpleOpenAI.builder().apiKey("").build();
    }
}
