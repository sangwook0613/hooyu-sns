package com.example.pushjob.content.domain;

import lombok.*;

import javax.persistence.*;
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

    @Column
    private LocalDateTime recentAt;
    @Column
    private LocalDateTime statusAt;
    @Column
    private LocalDateTime imageAt;
    @Column
    private LocalDateTime surveyAt;

    @Builder
    public RecordTime(LocalDateTime recentAt, LocalDateTime statusAt, LocalDateTime imageAt, LocalDateTime surveyAt){
        this.recentAt = recentAt;
        this.statusAt = statusAt;
        this.imageAt = imageAt;
        this.surveyAt = surveyAt;
    }
}
