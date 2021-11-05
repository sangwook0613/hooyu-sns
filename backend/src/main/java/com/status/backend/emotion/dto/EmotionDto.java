package com.status.backend.emotion.dto;


import com.status.backend.content.domain.Content;
import com.status.backend.emotion.domain.Emotion;
import lombok.*;
import lombok.extern.java.Log;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class EmotionDto {
    private Long userPK;
    private Long contentPk;
    private String contentEmoji;

    public EmotionDto(Emotion entity) {
        this.userPK = entity.getUser().getId();
        this.contentPk = entity.getContent().getId();
        this.contentEmoji = entity.getContentEmoji();
    }
}
