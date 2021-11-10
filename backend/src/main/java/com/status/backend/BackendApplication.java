package com.status.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import javax.annotation.PostConstruct;
import java.util.TimeZone;

@EnableJpaAuditing
@SpringBootApplication
public class BackendApplication {

    @PostConstruct
    public void started() {
        // timezone Asia/Seoul 셋팅
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));

    }

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

}
