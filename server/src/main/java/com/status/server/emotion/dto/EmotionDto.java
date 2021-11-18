package com.status.server.emotion.dto;


import com.status.server.emotion.domain.Emotion;
import lombok.*;

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
