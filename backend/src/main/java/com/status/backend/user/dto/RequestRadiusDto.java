package com.status.backend.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class RequestRadiusDto {
    @NotNull(message = "id는 필수 값입니다.")
    @Min(1)
    Long userPK;
    BigDecimal lat;
    BigDecimal lon;
    int radius;
}
