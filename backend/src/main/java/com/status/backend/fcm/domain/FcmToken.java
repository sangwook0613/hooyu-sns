package com.status.backend.fcm.domain;

import com.status.backend.global.domain.BaseTime;
import com.status.backend.user.domain.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter @Setter @ToString
@NoArgsConstructor
@Entity
public class FcmToken extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column
    private String token;

    @Column
    private boolean longTime = Boolean.FALSE;

    @Column
    private LocalDateTime pushOne;

    @Column
    private LocalDateTime pushTwo;

    @Column
    private LocalDateTime pushThree;

    @Builder
    public FcmToken(User user, String token) {
        this.user = user;
        this.token = token;
    }

    public FcmToken update(String token){
        this.token = token;
        return this;
    }

}
