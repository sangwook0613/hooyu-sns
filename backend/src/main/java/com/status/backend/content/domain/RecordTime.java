package com.status.backend.content.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class RecordTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime statusAt;
    private LocalDateTime imageAt;
    private LocalDateTime surveyAt;

    @Builder
    public RecordTime(LocalDateTime statusAt, LocalDateTime imageAt, LocalDateTime surveyAt){
        this.statusAt = statusAt;
        this.imageAt = imageAt;
        this.surveyAt = surveyAt;
    }
}
