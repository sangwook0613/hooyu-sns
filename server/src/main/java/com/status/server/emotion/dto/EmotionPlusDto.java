package com.status.server.emotion.dto;


import com.status.server.emotion.domain.Emotion;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class EmotionPlusDto {
//    private Long userPK;
    private String contentEmoji;

    public EmotionPlusDto(Emotion entity) {
//        this.userPK = entity.getUser().getId();
        this.contentEmoji = entity.getContentEmoji();
    }
}
