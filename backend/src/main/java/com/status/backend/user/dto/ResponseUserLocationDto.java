package com.status.backend.user.dto;

import com.status.backend.content.dto.RequestContentTimeDto;
import com.status.backend.global.dto.DistDto;
import lombok.*;

/*
- 유저 기본 정보 (이모지, 닉네임)
- 유저 좌표(위경도) x_dir, y_dir,
- 프라이빗 존 내 위치 여부
- 유저의 컨텐츠 상태(시간)
 */
@NoArgsConstructor
@Getter
@Setter
@ToString
public class ResponseUserLocationDto {
    private String name;
    private String emoji;
    private DistDto distDto;
    private Boolean privateZone;
    private RequestContentTimeDto contentTime;

    @Builder
    public ResponseUserLocationDto(String name, String emoji,Boolean privateZone, DistDto distDto, RequestContentTimeDto contentTimeDto){
        this.name = name;
        this.emoji = emoji;
        this.privateZone = privateZone;
        this.distDto = distDto;
        this.contentTime = contentTimeDto;
    }
}
