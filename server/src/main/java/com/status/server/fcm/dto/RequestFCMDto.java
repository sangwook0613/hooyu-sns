package com.status.server.fcm.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@AllArgsConstructor
@Getter
public class RequestFCMDto {

//    private Long userPK;
    private String browserToken;

}
