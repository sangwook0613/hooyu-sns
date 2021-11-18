package com.status.server.global.dto;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class DistDto {
    private double xDist;
    private double yDist;
    private double dist;

    @Builder
    public DistDto(double xDist, double yDist, double dist){
        this.xDist = xDist;
        this.yDist = yDist;
        this.dist = dist;
    }

}
