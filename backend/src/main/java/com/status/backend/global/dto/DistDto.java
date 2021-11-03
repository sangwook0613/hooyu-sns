package com.status.backend.global.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class DistDto {
    private BigDecimal xDist;
    private BigDecimal yDist;
    private BigDecimal dist;
}
