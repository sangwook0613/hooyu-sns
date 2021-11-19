package com.status.server.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class NameDto {
//    @NotNull(message = "id는 필수 값입니다.")
//    @Min(1)
//    Long userPK;
    String userName;
}