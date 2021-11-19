package com.status.server.content.domain;

import com.status.server.global.domain.BaseTime;
import com.status.server.user.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class ReportedContent extends BaseTime {
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
    private String reason;

    @Builder
    public ReportedContent(User user, Content content, String reason){
        this.user = user;
        this.content = content;
        this.reason = reason;
    }
}
