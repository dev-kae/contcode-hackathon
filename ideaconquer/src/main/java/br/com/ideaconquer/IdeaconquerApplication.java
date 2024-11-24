package br.com.ideaconquer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class IdeaconquerApplication {

    public static void main(String[] args) {
        SpringApplication.run(IdeaconquerApplication.class, args);
    }

}
