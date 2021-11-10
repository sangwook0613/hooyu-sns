package com.status.backend.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class NameDto {
    @NotNull(message = "id는 필수 값입니다.")
    @Min(1)
    Long userPK;
    String userName;
}