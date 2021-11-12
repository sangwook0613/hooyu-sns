package com.example.pushjob.fcm.service;

import com.example.pushjob.fcm.domain.FcmTokenRepository;
import com.example.pushjob.fcm.dto.FcmMessageDto;
import com.example.pushjob.user.domain.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@RequiredArgsConstructor
@Service
@Transactional
public class FcmService {

    private final String API_URL=
            "https://fcm.googleapis.com/fcm/send";
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final FcmTokenRepository fcmTokenRepository;
    private final UserRepository userRepository;

    public void sendMessageTo(String targetToken,String title, String body) throws IOException {
        String message = makeMessage(targetToken, title, body);
        MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
        params.add("body", message);
        HttpHeaders headers = new HttpHeaders();

        headers.add("Content-Type", "application/json");
        headers.add("Authorization", "key=AAAAAS-0w3k:APA91bGtZnz57sBMD87Q0JtVdeJn5M44L-u-KguEq1KsfgAddqyPIxinXc5-L3BOllPqCpBC-A10ylMUk43YwdnVuzrm0suShp1OOGP4i2N3j6xHkoDDQi5BkSUqZquD59l19JnQaIRS");

        HttpEntity<String> enti = new HttpEntity<String>(message,headers);

        RestTemplate rest = new RestTemplate();
        ResponseEntity<String> response = rest.exchange(API_URL, HttpMethod.POST, enti, String.class);
    }

    private String makeMessage(String targetToken,String title,String body) throws JsonProcessingException {
        FcmMessageDto fcmMessageDto = FcmMessageDto.builder()
                .data(FcmMessageDto.Data.builder()
                        .title(title)
                        .body(body)
                        .build()
                )
                .to(targetToken)
                .build();

        return objectMapper.writeValueAsString(fcmMessageDto);
    }

}