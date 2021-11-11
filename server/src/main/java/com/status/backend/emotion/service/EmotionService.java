package com.status.backend.emotion.service;


import com.status.backend.emotion.dto.EmotionDto;
import com.status.backend.global.exception.NoContentException;
import com.status.backend.global.exception.NoEmotionException;
import com.status.backend.global.exception.NoUserException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EmotionService {

    List<EmotionDto> getEmotions(Long contentPK) throws NoContentException;
    String toEmotion(Long userPK, Long contentPK, String contentEmoji) throws NoUserException, NoContentException, NoEmotionException;
}
