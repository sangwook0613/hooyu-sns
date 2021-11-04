package com.status.backend.content.dto;

import com.status.backend.content.domain.Content;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

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

    private List<String> answerList;

    private HashMap<String, Integer> count;

    public ResponseSurveyDto(Content entity) {
        this.contentPK = entity.getId();
        this.exon = entity.getExon();
        this.color = entity.getColor();
        this.answerList = new ArrayList<>();
        this.count = new HashMap<>();
    }

}
