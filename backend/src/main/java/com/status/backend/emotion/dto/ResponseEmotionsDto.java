package com.status.backend.emotion.dto;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.cfg.MapperBuilder;
import com.status.backend.emotion.domain.Emotion;
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
