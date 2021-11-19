package com.status.server.content.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class RequestReportDto {
//    private Long userPK;
    private Long ContentPK;
    private String reason;
}