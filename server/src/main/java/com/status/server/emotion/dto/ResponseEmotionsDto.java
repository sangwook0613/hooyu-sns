package com.status.server.emotion.dto;

import lombok.*;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class ResponseEmotionsDto {
    private List<EmotionDto> emotions;

    @Builder
    public ResponseEmotionsDto(List<EmotionDto> emotions){
        this.emotions  = emotions;
    }

}
