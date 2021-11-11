package com.status.server.content.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class VoteSurveyDto {
    Long userPK;
    Long contentPK;
    Long answerPK;
}
