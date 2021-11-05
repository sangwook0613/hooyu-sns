package com.status.backend.content.service;

import com.status.backend.content.domain.*;
import com.status.backend.content.dto.ResponseContentDto;
import com.status.backend.content.dto.ResponseSurveyDto;
import com.status.backend.global.exception.NoAuthorityUserException;
import com.status.backend.global.exception.NoContentException;
import com.status.backend.global.exception.NoUserException;
import com.status.backend.user.domain.User;
import com.status.backend.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ContentServiceImpl implements ContentService {
    private final UserRepository userRepository;
    private final ContentRepository contentRepository;
    private final RecordTimeRepository recordTimeRepository;
    private final SurveyContentAnswerRepository surveyContentAnswerRepository;

    Logger logger = LoggerFactory.getLogger(ContentServiceImpl.class);

    @Transactional
    @Override
    public String createStatusContent(Long userPK, String exon, String color, Type type) throws NoUserException {
        User user = userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        Content content = Content.builder().user(user).exon(exon).color(color).type(type).build();
        logger.debug("content가 잘 만들어 젔어요 : {}", content.toString());
        logger.debug("content가 잘 만들어 젔어요 ID : {}", content.getId());
        contentRepository.save(content);
        logger.debug("content가 잘 저장되었지!!!!!!!");

        RecordTime recordTime = user.getRecordTime();
        if (recordTime == null) {
            recordTime = RecordTime.builder().imageAt(content.getCreatedAt()).build();
            user.setRecordTime(recordTime);
            userRepository.save(user);
        } else {
            recordTime = user.getRecordTime();
            recordTime.setImageAt(content.getModifiedAt());
        }
        recordTimeRepository.save(recordTime);
        return "Success!";
    }


    @Transactional
    @Override
    public String createImageContent(Long userPK, String exon, String color, Type type) throws NoUserException {
        User user = userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        Content content = Content.builder().user(user).exon(exon).color(color).type(type).build();
        contentRepository.save(content);
        RecordTime recordTime = user.getRecordTime();
        if (recordTime == null) {
            recordTime = RecordTime.builder().imageAt(content.getCreatedAt()).build();
            user.setRecordTime(recordTime);
            userRepository.save(user);
        } else {
            recordTime = user.getRecordTime();
            recordTime.setImageAt(content.getModifiedAt());
        }
        recordTimeRepository.save(recordTime);
        return "Success!";
    }


    @Transactional
    @Override
    public String createSurveyContent(Long userPK, String exon, String color, Type type, List<String> answerList) throws NoUserException {
        User user = userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        Content content = Content.builder().user(user).exon(exon).color(color).type(type).build();
        contentRepository.save(content);
        logger.debug("설문 생성 완료!!!!!!!!!!!! : {}", content);
        RecordTime recordTime = user.getRecordTime();
        if (recordTime == null) {
            recordTime = RecordTime.builder().imageAt(content.getCreatedAt()).build();
            user.setRecordTime(recordTime);
            logger.debug("사용자 최신 컨탠츠 최초 생성 완료!!!! : {}", user);
            userRepository.save(user);
        } else {
            recordTime = user.getRecordTime();
            recordTime.setSurveyAt(content.getModifiedAt());
            logger.debug("확인 하자 투표 종이 : {}", recordTime);
        }
        recordTimeRepository.save(recordTime);
        logger.debug("답안지 입력 준비 !!!!");
        for (int i = 0; i < answerList.size(); i++) {
            String ans = answerList.get(i);
            surveyContentAnswerRepository.save(SurveyContentAnswer.builder().user(user).content(content).answer(ans).build());
        }

        logger.debug("답안지 입력 완료 !!!!");
        return "Success!";
    }

    @Transactional
    @Override
    public String voteSurvey(Long userPK, Long contentPK, Long answerPK) throws NoUserException, NoContentException {
        User user = userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        Content content = contentRepository.findById(contentPK).orElseThrow(() -> new NoContentException("해당하는 컨탠츠는 없습니다."));
        if(user.getId() == content.getUser().getId()) return "본인은 투표할수 없습니다.";
        if (!surveyContentAnswerRepository.existsById(answerPK)) throw new NoContentException("해당하는 선택지가 없습니다.");

        String result = "성공적으로 투표 했습니다.";
        if (surveyContentAnswerRepository.existsByUserIdAndContentId(userPK, contentPK)) {
            List<SurveyContentAnswer> list = surveyContentAnswerRepository.findByUserIdAndContentId(userPK, contentPK);
            for (int i = 0; i < list.size(); i++) {
                surveyContentAnswerRepository.delete(list.get(i));
            }
            result = "성공적으로 투표 취소했습니다.";
        } else {
            SurveyContentAnswer surveyContentAnswer = surveyContentAnswerRepository.findById(answerPK).orElseThrow(() -> new NoContentException("해당하는 설문은 없습니다."));
            surveyContentAnswerRepository.save(SurveyContentAnswer.builder().user(user).content(content).answer(surveyContentAnswer.getAnswer()).build());
        }
        return result;
    }

    @Transactional
    @Override
    public String votedSurvey(Long userPK, Long contentPK) throws NoUserException, NoContentException {
        if (!userRepository.existsById(userPK)) throw new NoUserException("해당하는 사용자가 없습니다.");
        if (!contentRepository.existsById(contentPK)) throw new NoContentException("해당하는 컨탠츠는 없습니다.");

        String result = "투표하지 않았습니다.";
        if (surveyContentAnswerRepository.existsByUserIdAndContentId(userPK, contentPK)) {
            List<SurveyContentAnswer> list = surveyContentAnswerRepository.findByUserIdAndContentId(userPK, contentPK);
            if (list.size() == 1)
                result = list.get(0).getAnswer();
        }
        return result;
    }

    @Transactional
    @Override
    public List<ResponseContentDto> statusContent(String userName) throws NoUserException, NoContentException {
        User user = userRepository.findByName(userName).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        List<Content> contents = contentRepository.findByTypeAndUserIdOrderByCreatedAtDesc(Type.STATUS, user.getId());
        if (contents.isEmpty())
            throw new NoContentException("해당하는 컨탠츠는 없습니다.");

        return contents.stream().map((e) -> {
            ResponseContentDto responseContentDto = new ResponseContentDto(e);
            return responseContentDto;
        }).collect(Collectors.toList());
    }

    @Transactional
    @Override
    public List<ResponseContentDto> imageContent(String userName) throws NoUserException, NoContentException {
        User user = userRepository.findByName(userName).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        List<Content> contents = contentRepository.findByTypeAndUserIdOrderByCreatedAtDesc(Type.IMAGE, user.getId());
        if (contents.isEmpty())
            throw new NoContentException("해당하는 컨탠츠는 없습니다.");

        return contents.stream().map((e) -> {
            ResponseContentDto responseContentDto = new ResponseContentDto(e);
            return responseContentDto;
        }).collect(Collectors.toList());
    }

    @Transactional
    @Override
    public List<ResponseSurveyDto> surveyContent(String userName) throws NoUserException, NoContentException {
        User user = userRepository.findByName(userName).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        List<Content> contents = contentRepository.findByTypeAndUserIdOrderByCreatedAtDesc(Type.SURVEY, user.getId());
        if (contents.isEmpty())
            throw new NoContentException("해당하는 컨탠츠는 없습니다.");
        List<ResponseSurveyDto> list = contents.stream().map((e) -> {
            ResponseSurveyDto responseSurveyDto = new ResponseSurveyDto(e);
            HashMap<String, Integer> coutingMap = responseSurveyDto.getCount();
            HashMap<String, Long> answerPKMap = responseSurveyDto.getAnswerPK();

            List<String> tmp = surveyContentAnswerRepository.findByContentId(e.getId()).stream().map((s) -> {
                String target = s.getAnswer();
                // answer 선택받은 횟수
                if (coutingMap.containsKey(target)) {
                    coutingMap.put(target, coutingMap.get(target) + 1);
                } else {
                    coutingMap.put(target, 1);
                    answerPKMap.put(target, s.getId());
                }
                if (user.getId() == s.getUser().getId()) {
                    coutingMap.put(target, coutingMap.get(target) - 1);
                    logger.info("test!!!!!!!!!!!!!! : {},     : {}", user.getId(), s.getUser().getId());
                    return target;
                }
                return null;
            }).collect(Collectors.toList());
            responseSurveyDto.setAnswerList(tmp.stream().filter(t->t != null).collect(Collectors.toList()));

            return responseSurveyDto;
        }).collect(Collectors.toList());
        return list;
    }

    @Transactional
    @Override
    public String deleteContent(Long userPK, Long contentPK, Type type) throws NoContentException, NoUserException, NoAuthorityUserException {
        if (!userRepository.existsById(userPK)) throw new NoUserException("해당하는 사용자가 없습니다.");
        if (!contentRepository.existsById(contentPK)) throw new NoContentException("해당하는 컨탠츠는 없습니다.");
        Content content = contentRepository.findByUserIdAndIdAndType(userPK,contentPK,type).orElseThrow(() -> new NoContentException("컨탠츠 삭제 실패했습니다."));
        if(content.getUser().getId() != userPK)
            throw new NoAuthorityUserException("해당 컨텐츠 삭재할 권한이 없습니다.");
        surveyContentAnswerRepository.deleteByContentId(contentPK);
        contentRepository.deleteById(contentPK);
        return "Success!";
    }

}
