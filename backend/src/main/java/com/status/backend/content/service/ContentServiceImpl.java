package com.status.backend.content.service;

import com.status.backend.global.exception.NoUserException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ContentServiceImpl implements ContentService{
    @Override
    public String createContent(Long userPK, String exon, String color, String Type) throws NoUserException {
        return null;
    }
}
