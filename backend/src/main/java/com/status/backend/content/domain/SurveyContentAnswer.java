package com.status.backend.content.domain;

import com.status.backend.user.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class SurveyContentAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "content_id")
    private Content content;

    private String answer;

    @Builder
    public SurveyContentAnswer(User user, Content content, String answer){
        this.user = user;
        this.content = content;
        this.answer = answer;
    }
}
