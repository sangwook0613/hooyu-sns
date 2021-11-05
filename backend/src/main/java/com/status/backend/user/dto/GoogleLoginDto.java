package com.status.backend.user.dto;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class GoogleLoginDto {
    private String googleIdToken;
}
