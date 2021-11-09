package com.status.backend.content.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@NoArgsConstructor
@Getter
@Setter
public class ImageDto {
    private Long userPK;
    private MultipartFile multipartFile;
    private String color;
}
