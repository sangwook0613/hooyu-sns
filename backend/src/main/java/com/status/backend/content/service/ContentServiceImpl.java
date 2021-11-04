package com.status.backend.content.service;

import com.status.backend.content.domain.*;
import com.status.backend.content.dto.ResponseContentDto;
import com.status.backend.content.dto.ResponseSurveyDto;
import com.status.backend.global.exception.NoContentException;
import com.status.backend.global.exception.NoUserException;
import com.status.backend.user.domain.User;
import com.status.backend.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ContentServiceImpl implements ContentService{
    private final UserRepository userRepository;
    private final ContentRepository contentRepository;
    private final RecordTimeRepository recordTimeRepository;
    private final SurveyContentAnswerRepository surveyContentAnswerRepository;

    Logger logger = LoggerFactory.getLogger(ContentServiceImpl.class);
    @Override
    public String createStatusContent(Long userPK, String exon, String color, Type type) throws NoUserException {
        User user = userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        Content content = Content.builder().user(user).exon(exon).color(color).type(type).build();
        contentRepository.save(content);
        if(user.getRecordTime()== null){
            user.setRecordTime(RecordTime.builder().statusAt(content.getCreatedAt()).build());
            userRepository.save(user);
        }else{
            RecordTime recordTime = user.getRecordTime();
            recordTime.setStatusAt(content.getModifiedAt());
            recordTimeRepository.save(recordTime);
        }
        return "Success!";
    }

    @Override
    public String createImageContent(Long userPK, String exon, String color, Type type) throws NoUserException {
        User user = userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        Content content = Content.builder().user(user).exon(exon).color(color).type(type).build();
        contentRepository.save(content);
        if(user.getRecordTime()== null){
            user.setRecordTime(RecordTime.builder().imageAt(content.getCreatedAt()).build());
            userRepository.save(user);
        }else{
            RecordTime recordTime = user.getRecordTime();
            recordTime.setImageAt(content.getModifiedAt());
            recordTimeRepository.save(recordTime);
        }
        return "Success!";
    }

    @Override
    public String createSurveyContent(Long userPK, String exon, String color, Type type, List<String> answerList) throws NoUserException {
        User user = userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        Content content = Content.builder().user(user).exon(exon).color(color).type(type).build();
        contentRepository.save(content);
        if(user.getRecordTime()== null){
            user.setRecordTime(RecordTime.builder().imageAt(content.getCreatedAt()).build());
            userRepository.save(user);
        }else{
            RecordTime recordTime = user.getRecordTime();
            recordTime.setImageAt(content.getModifiedAt());
            recordTimeRepository.save(recordTime);
        }
        for (int i = 0; i < answerList.size(); i++) {
            String ans = answerList.get(i);
            surveyContentAnswerRepository.save(SurveyContentAnswer.builder().user(user).content(content).answer(ans).build());
        }
        return "Success!";
    }

    @Override
    public String voteSurvey(Long userPK, Long contentPK, Long answerPK) throws NoUserException, NoContentException {
        String result = "성공적으로 투표 했습니다.";
        if(surveyContentAnswerRepository.existsByUserIdAndContentId(userPK,contentPK)){
            List<SurveyContentAnswer> list = surveyContentAnswerRepository.findByUserIdAndContentId(userPK,contentPK);
            for (int i = 0; i < list.size(); i++) {
                surveyContentAnswerRepository.delete(list.get(i));
            }
            result = "성공적으로 투표 취소했습니다.";
        }else{
            SurveyContentAnswer surveyContentAnswer = surveyContentAnswerRepository.findById(answerPK).orElseThrow(() -> new NoContentException("해당하는 설문은 없습니다."));
            User user = userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
            Content content = contentRepository.findById(contentPK).orElseThrow(() -> new NoContentException("해당하는 컨탠츠는 없습니다."));
            surveyContentAnswerRepository.save(SurveyContentAnswer.builder().user(user).content(content).answer(surveyContentAnswer.getAnswer()).build());
        }
        return result;
    }

    @Override
    public String votedSurvey(Long userPK, Long contentPK) throws NoUserException, NoContentException {
        String result = "투표하지 않았습니다.";
        if(surveyContentAnswerRepository.existsByUserIdAndContentId(userPK,contentPK)){
            List<SurveyContentAnswer> list = surveyContentAnswerRepository.findByUserIdAndContentId(userPK,contentPK);
            if(list.size()==1)
                result = list.get(0).getAnswer();
        }
        return result;
    }

    @Override
    public List<ResponseContentDto> statusContent(String userName) throws NoUserException, NoContentException {
        User user = userRepository.findByName(userName).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        List<Content> contents = contentRepository.findByTypeAndUserIdOrderByCreatedAtDesc(Type.STATUS,user.getId());
        if (contents.isEmpty())
            throw new NoContentException("해당하는 컨탠츠는 없습니다.");

        return contents.stream().map((e) -> {
            ResponseContentDto responseContentDto = new ResponseContentDto(e);
            return responseContentDto;
        }).collect(Collectors.toList());
    }

    @Override
    public List<ResponseContentDto> imageContent(String userName) throws NoUserException, NoContentException {
        User user = userRepository.findByName(userName).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        List<Content> contents = contentRepository.findByTypeAndUserIdOrderByCreatedAtDesc(Type.IMAGE,user.getId());
        if (contents.isEmpty())
            throw new NoContentException("해당하는 컨탠츠는 없습니다.");

        return contents.stream().map((e) -> {
            ResponseContentDto responseContentDto = new ResponseContentDto(e);
            return responseContentDto;
        }).collect(Collectors.toList());
    }

    @Override
    public List<ResponseSurveyDto> surveyContent(String userName) throws NoUserException, NoContentException {
        User user = userRepository.findByName(userName).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        List<Content> contents = contentRepository.findByTypeAndUserIdOrderByCreatedAtDesc(Type.SURVEY,user.getId());
        if (contents.isEmpty())
            throw new NoContentException("해당하는 컨탠츠는 없습니다.");
        List<ResponseSurveyDto> list = contents.stream().map((e) -> {
            ResponseSurveyDto responseSurveyDto = new ResponseSurveyDto(e);
            HashMap<String ,Integer> coutingMap = responseSurveyDto.getCount();
            responseSurveyDto.setAnswerList(surveyContentAnswerRepository.findByUserIdAndContentId(e.getUser().getId(),e.getId()).stream().map((s)->{
                String target = s.getAnswer();
                if(coutingMap.containsKey(target)){
                    coutingMap.put(target, coutingMap.get(target)+1);
                }else{
                    coutingMap.put(target, 1);
                }
                return target;
            }).collect(Collectors.toList()));

            return responseSurveyDto;
        }).collect(Collectors.toList());
        return list;
    }

}
