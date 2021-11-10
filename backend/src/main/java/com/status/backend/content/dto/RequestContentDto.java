package com.status.backend.content.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class RequestContentDto {
    private Long userPK;
    private String exon;
    private String color;
}
