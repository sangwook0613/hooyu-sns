package com.status.backend.content.domain;

import com.status.backend.global.domain.BaseTime;
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
public class Content extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = true)
    private String exon;

    @Column(nullable = true)
    private String color;

    @Enumerated
    @Column(nullable = false)
    private Type type;

    @Builder
    public Content(User user, String exon, String color, Type type){
        this.user = user;
        this.exon = exon;
        this.color = color;
        this.type = type;
    }
}
