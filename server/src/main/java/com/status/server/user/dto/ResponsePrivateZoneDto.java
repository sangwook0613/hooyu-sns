package com.status.server.user.dto;

import com.status.server.user.domain.PrivateZone;

import java.math.BigDecimal;

public class ResponsePrivateZoneDto {

    private String title;

    private BigDecimal latitude;

    private BigDecimal longitude;

    public ResponsePrivateZoneDto(PrivateZone entity) {
        this.title = entity.getTitle();
        this.latitude = entity.getLatitude();
        this.longitude = entity.getLongitude();
    }
}
