package com.status.server.global.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class K8sTestController {
    @GetMapping("/api/test")
    public String DemoRestApi() {
        return "Hi, I'm demo application";
    }
}
