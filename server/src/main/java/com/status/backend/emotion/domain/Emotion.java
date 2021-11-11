package com.status.backend.emotion.domain;

import com.status.backend.content.domain.Content;
import com.status.backend.user.domain.User;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Entity
public class Emotion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "content_id")
    private Content content;

    @Column
    private String contentEmoji;

    @Builder
    public Emotion(User user, Content content, String contentEmoji){
        this.user = user;
        this.content = content;
        this.contentEmoji = contentEmoji;
    }
}