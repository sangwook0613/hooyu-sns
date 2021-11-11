package com.status.server.content.domain;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
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
