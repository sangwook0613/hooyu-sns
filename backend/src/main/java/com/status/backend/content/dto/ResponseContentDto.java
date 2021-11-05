package com.status.backend.content.dto;

import com.status.backend.content.domain.Content;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class ResponseContentDto {
    private Long contentPk;
    private String exon;
    private String color;

    public ResponseContentDto(Content entity) {
        this.contentPk = entity.getId();
        this.exon = entity.getExon();
        this.color = entity.getColor();
    }
}
