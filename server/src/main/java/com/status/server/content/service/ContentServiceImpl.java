package com.status.server.content.service;

import com.status.server.content.domain.*;
import com.status.server.content.dto.ResponseContentDto;
import com.status.server.content.dto.ResponseContentPlusDto;
import com.status.server.content.dto.ResponseSurveyDto;
import com.status.server.content.dto.ResponseSurveyPlusDto;
import com.status.server.emotion.domain.EmotionRepository;
import com.status.server.emotion.service.EmotionServiceImpl;
import com.status.server.fcm.domain.FcmToken;
import com.status.server.fcm.domain.FcmTokenRepository;
import com.status.server.global.exception.NoAuthorityUserException;
import com.status.server.global.exception.NoContentException;
import com.status.server.global.exception.NoUserException;
import com.status.server.global.util.SecurityUtil;
import com.status.server.user.domain.User;
import com.status.server.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
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
    private final FcmTokenRepository fcmTokenRepository;
    private final ReportedContentRepository reportedContentRepository;
    private final EmotionRepository emotionRepository;

    private final EmotionServiceImpl emotionService;

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
            recordTime = RecordTime.builder().statusAt(content.getCreatedAt()).recentAt(content.getCreatedAt()).build();
            user.setRecordTime(recordTime);
            userRepository.save(user);
        } else {
            recordTime = user.getRecordTime();
            recordTime.setStatusAt(content.getModifiedAt());
            recordTime.setRecentAt(content.getModifiedAt());
        }

        recordTimeRepository.save(recordTime);

        if (fcmTokenRepository.existsByUserId(userPK)) {
            setPushThree(userPK);
        }
        return "Success!";
    }

    @Transactional
    @Override
    public String createImageContent(Long userPK, String exon, String color, Type type) throws NoUserException, IOException {
        User user = userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        Content content = Content.builder().user(user).exon(exon).color(color).type(type).build();
        contentRepository.save(content);
        RecordTime recordTime = user.getRecordTime();
        if (recordTime == null) {
            recordTime = RecordTime.builder().imageAt(content.getCreatedAt()).recentAt(content.getCreatedAt()).build();
            user.setRecordTime(recordTime);
            userRepository.save(user);
        } else {
            recordTime = user.getRecordTime();
            recordTime.setImageAt(content.getModifiedAt());
            recordTime.setRecentAt(content.getModifiedAt());
        }
        recordTimeRepository.save(recordTime);
        if (fcmTokenRepository.existsByUserId(userPK)) {
            setPushThree(userPK);
        }
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
            recordTime = RecordTime.builder().imageAt(content.getCreatedAt()).recentAt(content.getCreatedAt()).build();
            user.setRecordTime(recordTime);
            logger.debug("사용자 최신 컨탠츠 최초 생성 완료!!!! : {}", user);
            userRepository.save(user);
        } else {
            recordTime = user.getRecordTime();
            recordTime.setSurveyAt(content.getModifiedAt());
            recordTime.setRecentAt(content.getModifiedAt());
            logger.debug("확인 하자 투표 종이 : {}", recordTime);
        }
        recordTimeRepository.save(recordTime);
        logger.debug("답안지 입력 준비 !!!!");
        for (int i = 0; i < answerList.size(); i++) {
            String ans = answerList.get(i);
            surveyContentAnswerRepository.save(SurveyContentAnswer.builder().user(user).content(content).answer(ans).build());
        }

        logger.debug("답안지 입력 완료 !!!!");
        if (fcmTokenRepository.existsByUserId(userPK)) {
            setPushThree(userPK);
        }
        return "Success!";
    }

    private void setPushThree(Long userPK) {
        FcmToken targetToken = fcmTokenRepository.findByUserId(userPK).get();
        targetToken.setPushThree(LocalDateTime.now().plusDays(5));
        fcmTokenRepository.save(targetToken);
    }

    @Transactional
    @Override
    public String voteSurvey(Long userPK, Long contentPK, Long answerPK) throws NoUserException, NoContentException {
        User user = userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        Content content = contentRepository.findById(contentPK).orElseThrow(() -> new NoContentException("해당하는 컨탠츠는 없습니다."));
        if (user.getId() == content.getUser().getId()) return "본인은 투표할수 없습니다.";
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

    public String votedcheck(Long userPK, Long contentPK){

        String result = "";
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
        return getContent(userName, Type.STATUS);
    }

    @Transactional
    @Override
    public List<ResponseContentDto> imageContent(String userName) throws NoUserException, NoContentException {
        return getContent(userName, Type.IMAGE);
    }

    private List<ResponseContentDto> getContent(String userName, Type type) throws NoUserException {
        User user = userRepository.findByName(userName).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        List<Content> contents = contentRepository.findByTypeAndUserIdOrderByCreatedAtDesc(type, user.getId());

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
//            throw new NoContentException("해당하는 컨탠츠는 없습니다.");
            return new ArrayList<>();

        List<ResponseSurveyDto> list = contents.stream().map((e) -> {
            ResponseSurveyDto responseSurveyDto = new ResponseSurveyDto(e);

            responseSurveyDto.setMyVote(votedcheck(SecurityUtil.getCurrentUserId(), e.getId()));

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
                    logger.debug("test!!!!!!!!!!!!!! : {},     : {}", user.getId(), s.getUser().getId());
                    return target;
                }
                return null;
            }).collect(Collectors.toList());
            responseSurveyDto.setAnswerList(tmp.stream().filter(t -> t != null).collect(Collectors.toList()));

            return responseSurveyDto;
        }).collect(Collectors.toList());
        return list;
    }

    @Transactional
    @Override
    public List<ResponseContentPlusDto> statusesContent(String userName) throws NoUserException, NoContentException {
        return getContents(userName, Type.STATUS);
    }

    @Transactional
    @Override
    public List<ResponseContentPlusDto> imagesContent(String userName) throws NoUserException, NoContentException {
        return getContents(userName, Type.IMAGE);
    }

    private List<ResponseContentPlusDto> getContents(String userName, Type type) throws NoUserException {
        User user = userRepository.findByName(userName).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        List<Content> contents = contentRepository.findByTypeAndUserIdOrderByCreatedAtDesc(type, user.getId());

        return contents.stream().map((e) -> {
            ResponseContentPlusDto responseContentPlusDto = new ResponseContentPlusDto(e);

            responseContentPlusDto.setEmotionDtoList(emotionService.getEmotionsPlus(e.getId()));

            return responseContentPlusDto;
        }).collect(Collectors.toList());
    }

    @Transactional
    @Override
    public List<ResponseSurveyPlusDto> surveysContent(String userName) throws NoUserException, NoContentException {
        User user = userRepository.findByName(userName).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        List<Content> contents = contentRepository.findByTypeAndUserIdOrderByCreatedAtDesc(Type.SURVEY, user.getId());
        if (contents.isEmpty())
//            throw new NoContentException("해당하는 컨탠츠는 없습니다.");
            return new ArrayList<>();

        List<ResponseSurveyPlusDto> list = contents.stream().map((e) -> {
            ResponseSurveyPlusDto responseSurveyPlusDto = new ResponseSurveyPlusDto(e);
            HashMap<String, Integer> coutingMap = responseSurveyPlusDto.getCount();
            HashMap<String, Long> answerPKMap = responseSurveyPlusDto.getAnswerPK();

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
                    logger.debug("test!!!!!!!!!!!!!! : {},     : {}", user.getId(), s.getUser().getId());
                    return target;
                }
                return null;
            }).collect(Collectors.toList());
            responseSurveyPlusDto.setAnswerList(tmp.stream().filter(t -> t != null).collect(Collectors.toList()));

            responseSurveyPlusDto.setEmotionPlusDtoList(emotionService.getEmotionsPlus(e.getId()));
            return responseSurveyPlusDto;
        }).collect(Collectors.toList());
        return list;
    }

    @Transactional
    @Override
    public String deleteContent(Long userPK, Long contentPK) throws NoContentException, NoUserException, NoAuthorityUserException {
        User user = userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        if (!contentRepository.existsById(contentPK)) throw new NoContentException("해당하는 컨탠츠는 없습니다.");
        Content content = contentRepository.findByUserIdAndId(userPK, contentPK).orElseThrow(() -> new NoContentException("컨탠츠 삭제 실패했습니다."));

        if (content.getUser().getId() != userPK)
            throw new NoAuthorityUserException("해당 컨텐츠 삭재할 권한이 없습니다.");

        reportedContentRepository.deleteAllByContentId(contentPK);

        emotionRepository.deleteAllByContentId(contentPK);

        surveyContentAnswerRepository.deleteByContentId(contentPK);
        contentRepository.deleteById(contentPK);

        List<Content> list;
        RecordTime recordTime = user.getRecordTime();
        if (recordTime != null) {
            recordTime = user.getRecordTime();
            if (content.getType() == Type.STATUS) {
                list = contentRepository.findByTypeAndUserIdOrderByCreatedAtDesc(Type.STATUS, userPK);
                if (list.size() == 0)
                    recordTime.setStatusAt(null);
                else
                    recordTime.setStatusAt(list.get(0).getCreatedAt());
            } else if (content.getType() == Type.IMAGE) {

                list = contentRepository.findByTypeAndUserIdOrderByCreatedAtDesc(Type.IMAGE, userPK);
                if (list.size() == 0)
                    recordTime.setImageAt(null);
                else
                    recordTime.setImageAt(list.get(0).getCreatedAt());
            } else {
                list = contentRepository.findByTypeAndUserIdOrderByCreatedAtDesc(Type.SURVEY, userPK);
                if (list.size() == 0)
                    recordTime.setSurveyAt(null);
                else
                    recordTime.setSurveyAt(list.get(0).getCreatedAt());
            }
        }
        recordTimeRepository.save(recordTime);

        return "Success!";
    }

    @Override
    public String reportContent(Long userPK, Long contentPK, String reason) throws NoContentException, NoUserException {
        User user = userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        Content content = contentRepository.findById(contentPK).orElseThrow(() -> new NoContentException("해당하는 컨탠츠는 없습니다."));
        reportedContentRepository.save(ReportedContent.builder().user(user).content(content).reason(reason).build());
        return "Success!";
    }

}
