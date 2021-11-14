package com.status.server.content.dto;

import com.status.server.content.domain.Content;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class ResponseContentDto {
    private Long contentPk;
    private String exon;
    private String color;
    private LocalDateTime createAt;

    public ResponseContentDto(Content entity) {
        this.createAt = entity.getCreatedAt();
        this.contentPk = entity.getId();
        this.exon = entity.getExon();
        this.color = entity.getColor();
    }
}
