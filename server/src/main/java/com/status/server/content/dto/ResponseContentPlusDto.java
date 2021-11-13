package com.status.server.content.dto;

import com.status.server.content.domain.Content;
import com.status.server.emotion.dto.EmotionPlusDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class ResponseContentPlusDto {
    private Long contentPk;
    private String exon;
    private String color;
    private LocalDateTime createAt;
    private List<EmotionPlusDto> emotionDtoList;

    public ResponseContentPlusDto(Content entity) {
        this.createAt = entity.getCreatedAt();
        this.contentPk = entity.getId();
        this.exon = entity.getExon();
        this.color = entity.getColor();
    }
}
