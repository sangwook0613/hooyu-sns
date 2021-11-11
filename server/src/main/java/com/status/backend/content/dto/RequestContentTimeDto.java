package com.status.backend.content.dto;

import com.status.backend.content.domain.RecordTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class RequestContentTimeDto {

    private LocalDateTime status;
    private LocalDateTime images;
    private LocalDateTime survey;

    public RequestContentTimeDto(RecordTime entity) {
        this.status = entity.getStatusAt();
        this.images = entity.getImageAt();
        this.survey = entity.getSurveyAt();
    }

}
