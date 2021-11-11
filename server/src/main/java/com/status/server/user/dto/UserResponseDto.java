package com.status.server.user.dto;

import com.status.server.user.domain.User;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserResponseDto {
    private Long id;
    private String name;
    private String emoji;
    private Boolean acceptPush;
    private Boolean acceptSync;
    private int acceptRadius;


    public UserResponseDto(User entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.emoji = entity.getUserEmoji();
        this.acceptPush = entity.isAcceptPush();
        this.acceptSync = entity.isAcceptSync();
        this.acceptRadius = entity.getAcceptRadius();
    }

    @Override
    public String toString() {
        return this.id + " : " + this.name + " : " + this.emoji;
    }
}
