package com.status.backend.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@Getter
@ToString
public class UserRequestDto {
    private Long id;
    private String email;
    private String name;
    private String emoji;
    private String profileImg;

    @Builder
    public UserRequestDto(Long id, String email, String name, String emoji, String profileImg) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.emoji = emoji;
        this.profileImg = profileImg;
    }
}
