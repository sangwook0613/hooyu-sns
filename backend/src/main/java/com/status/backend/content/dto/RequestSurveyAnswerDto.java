package com.status.backend.content.dto;

import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@ToString
public class RequestSurveyAnswerDto {
    private RequestContentDto requestContentDto;
    private List<String> answerList;
}
