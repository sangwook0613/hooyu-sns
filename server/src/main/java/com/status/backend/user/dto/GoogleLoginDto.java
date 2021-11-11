package com.status.backend.user.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class GoogleLoginDto {
    private String googleIdToken;
}
