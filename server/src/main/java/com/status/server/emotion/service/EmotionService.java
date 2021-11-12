package com.status.server.emotion.service;


import com.status.server.emotion.dto.EmotionDto;
import com.status.server.global.exception.NoContentException;
import com.status.server.global.exception.NoEmotionException;
import com.status.server.global.exception.NoUserException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EmotionService {

    List<EmotionDto> getEmotions(Long contentPK) throws NoContentException;
    String toEmotion(Long userPK, Long contentPK, String contentEmoji) throws NoUserException, NoContentException, NoEmotionException;
}
