package com.status.server.global.util;

import com.status.server.global.dto.DistDto;

import java.math.BigDecimal;
import java.math.RoundingMode;

public class RadarMath {

    private BigDecimal PI = new BigDecimal(Math.PI);

    private BigDecimal degreeToRadian(BigDecimal deg){
        return deg.multiply(PI).divide(new BigDecimal(180), 6, RoundingMode.HALF_UP);
    }
    private BigDecimal radianToDegree(BigDecimal deg){
        return deg.multiply(new BigDecimal(180)).divide(PI, 6, RoundingMode.HALF_UP);
    }

    public DistDto distance(BigDecimal lat_1, BigDecimal lon_1, BigDecimal lat_2, BigDecimal lon_2){
        double x_dist =0, y_dist=0;
        BigDecimal theta = lon_1.subtract(lon_2);
        double radianTheta = degreeToRadian(theta).doubleValue();
        double radianLat1 = degreeToRadian(lat_1).doubleValue();
        double radianLat2 = degreeToRadian(lat_2).doubleValue();
        double radianLon1 = degreeToRadian(lon_1).doubleValue();
        double radianLon2 = degreeToRadian(lon_2).doubleValue();

        double dist = Math.sin(radianLat1)*Math.sin(radianLat2) + Math.cos(radianLat1)*Math.cos(radianLat2)*Math.cos(radianTheta);

        double y = Math.sin(radianLon2 - radianLon1) * Math.cos(radianLat2);
        double x = Math.cos(radianLat1)*Math.sin(radianLat2) - Math.sin(radianLat1)*Math.cos(radianLat2)*Math.cos(radianLon2-radianLon1);

        double bangwee = (Math.atan2(y,x) * 180 / Math.PI + 360) % 360;

        dist = Math.acos(dist);
        dist = radianToDegree(new BigDecimal(dist)).doubleValue();
        dist = dist*60*1.1515*1609.344;

        if(bangwee < 90){
            double r = Math.toRadians(bangwee);
            x_dist = dist * Math.sin(r);
            y_dist = -dist* Math.cos(r);
        }else if(90 <= bangwee && bangwee <180){
            double r = Math.toRadians(bangwee-90);
            x_dist = dist * Math.cos(r);
            y_dist = dist* Math.sin(r);
        }else if(180 <= bangwee && bangwee <270){
            double r = Math.toRadians(bangwee-180);
            x_dist = -dist * Math.sin(r);
            y_dist = dist* Math.cos(r);
        }else{
            double r = Math.toRadians(bangwee-270);
            x_dist = -dist * Math.cos(r);
            y_dist = -dist* Math.sin(r);
        }
        return DistDto.builder().xDist(x_dist).yDist(y_dist).dist(dist).build();
    }
}
