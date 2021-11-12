package com.status.server.fcm.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Builder
@AllArgsConstructor
@Getter @ToString
public class RequestFCMDto {

    private Long userPK;
    private String browserToken;

}
