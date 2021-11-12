package com.status.server.content.dto;

import com.status.server.content.domain.Content;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class ResponseSurveyDto {

    private Long contentPK;
    private String exon;
    private String color;
    private LocalDateTime createAt;

    private List<String> answerList;

    private HashMap<String, Integer> count;
    private HashMap<String, Long> answerPK;

    public ResponseSurveyDto(Content entity) {
        this.contentPK = entity.getId();
        this.exon = entity.getExon();
        this.color = entity.getColor();
        this.createAt = entity.getCreatedAt();
        this.answerList = new ArrayList<>();
        this.count = new HashMap<>();
        this.answerPK = new HashMap<>();
    }

}
