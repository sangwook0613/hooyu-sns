package com.status.backend.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

/*
- 유저 기본 정보 (PK, lat, lon, radius)
- 유저 좌표(위경도) x_dir, y_dir,
- 프라이빗 존 내 위치 여부
- 유저의 컨텐츠 상태(시간)
 */
@NoArgsConstructor
@Getter
@Setter
@ToString
public class RequestUserLocationDto {
    private RequestRadiusDto requestRadiusDto;
    private List<ResponseUserLocationDto> list;
}
