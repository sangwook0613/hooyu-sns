package com.example.pushjob.content.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Type {
    STATUS("TYPE_STATUS", "상태메시지"),
    IMAGE("TYPE_IMAGE", "이미지"),
    SURVEY("TYPE_SURVEY", "설문조사");

    private final String key;
    private final String title;
}
