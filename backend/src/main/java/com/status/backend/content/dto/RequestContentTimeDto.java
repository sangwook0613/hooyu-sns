package com.status.backend.content.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class RequestContentTimeDto {

    private LocalDateTime status;
    private LocalDateTime images;
    private LocalDateTime survey;
}
