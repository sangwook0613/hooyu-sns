package com.status.backend.content.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.status.backend.global.domain.BaseTime;
import com.status.backend.user.domain.User;
import lombok.*;

import javax.persistence.*;

@Getter @Setter
@ToString
@NoArgsConstructor
@Entity
public class Content extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonManagedReference
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
