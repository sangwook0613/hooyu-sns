package com.status.server.user.dto;

import com.status.server.user.domain.PrivateZone;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@NoArgsConstructor
@Getter
@Setter
public class ResponsePrivateZoneDto {

    private Long pzPK;

    private String title;

    private BigDecimal latitude;

    private BigDecimal longitude;

    public ResponsePrivateZoneDto(PrivateZone entity) {
        this.pzPK = entity.getId();
        this.title = entity.getTitle();
        this.latitude = entity.getLatitude();
        this.longitude = entity.getLongitude();
    }
}
