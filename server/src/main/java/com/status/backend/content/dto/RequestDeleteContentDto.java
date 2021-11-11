package com.status.backend.content.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class RequestDeleteContentDto {
    private Long userPK;
    private Long ContentPK;
}
