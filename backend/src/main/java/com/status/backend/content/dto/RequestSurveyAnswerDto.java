package com.status.backend.content.dto;

import lombok.Data;

import java.util.List;

@Data
public class RequestSurveyAnswerDto {
    private List<String> answerList;
}
