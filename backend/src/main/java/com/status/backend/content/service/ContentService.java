package com.status.backend.content.service;

import com.status.backend.global.exception.NoUserException;
import org.springframework.stereotype.Service;

@Service
public interface ContentService {
    String createContent(Long userPK, String exon, String color, String Type) throws NoUserException;
}
