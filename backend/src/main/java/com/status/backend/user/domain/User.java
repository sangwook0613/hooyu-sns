package com.status.backend.user.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.status.backend.content.domain.Content;
import com.status.backend.content.domain.RecordTime;
import com.status.backend.global.domain.BaseTime;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


//@SQLDelete(sql = "UPDATE user set deleted = true where id = ?")
//@Where(clause = "deleted = false")
@Getter @Setter
@NoArgsConstructor
@Entity
public class User extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "user_id", unique = true, nullable = false)
    private Long id;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(nullable = true)
    private String profileImg;

    @Column(nullable = true)
    private String userEmoji;

    @Column(nullable = true, columnDefinition = "LONGTEXT")
    private String refreshToken;

    @Column
    private boolean acceptPush = Boolean.TRUE;

    @Column
    private boolean acceptSync = Boolean.TRUE;

    @Column(nullable = true)
    private int acceptRadius;

    @Enumerated
    @Column(nullable = false)
    private Role role;

    @JsonBackReference
    @OneToMany(mappedBy = "user")
    List<PrivateZone> privateZones = new ArrayList<>();

    @OneToOne(mappedBy = "user")
    @JoinColumn(name = "location_id")
    private Location location = new Location();

    @JsonBackReference
    @OneToMany(mappedBy = "user")
    List<Content> contents = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "record_id")
    private RecordTime recordTime = new RecordTime();

    @Builder
    public User(String name, String email, String userEmoji, String profileImg, Role role){
        this.name = name;
        this.email = email;
        this.profileImg= profileImg;
        this.userEmoji= userEmoji;
        this.role = role;
    }

    public User update(String name, String userEmoji){
        this.name = name;
        this.userEmoji = userEmoji;
        return this;
    }

    public User updateRefreshToken(String refreshToken){
        this.refreshToken = refreshToken;
        return this;
    }

    public User updateRadius(int acceptRadius){
        this.acceptRadius = acceptRadius;
        return this;
    }

    public String getRoleKey(){
        return this.role.getKey();
    }

    @Override
    public String toString(){
        return "이름 : "+this.name+this.email;
    }
}
