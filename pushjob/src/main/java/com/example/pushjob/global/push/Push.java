package com.example.pushjob.global.push;


import com.example.pushjob.fcm.domain.FcmToken;
import com.example.pushjob.fcm.domain.FcmTokenRepository;
import com.example.pushjob.fcm.service.FcmService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class Push {

//    private final UserRepository userRepository;
//    private final RecordTimeRepository recordTimeRepository;
    private final FcmTokenRepository fcmTokenRepository;

    private final FcmService fcmService;

    Logger logger = LoggerFactory.getLogger(Push.class);

    @Scheduled(cron = "0 0 13 * * *")
    public void goPush() throws IOException {
        LocalDateTime nowTime = LocalDateTime.now();

//        //recent time을 이용한 push
//        List<Long> users = userRepository.findAllByRecordTimeRecentAtLessThanEqual(nowTime).stream().map((t)->{return t.getId();}).collect(Collectors.toList());
//
//        List<FcmToken> fcmTokens = fcmTokenRepository.findAllByUserIdIn(users);
//
//        for (int i = 0; i < fcmTokens.size(); i++) {
//            Long tmp = fcmTokens.get(i).getId();
//            logger.debug("{}", tmp);
//        }

        //test
//        nowTime = nowTime.minusHours(1);


        //장기 미 사용자 까꿍 message push three값을 이용한 push
        String title = "주변 사람들이 당신의 생각을 궁금해하고 있어요!";
        String body = "클릭해서 컨텐츠를 작성해보세요";
        List<FcmToken> fcmTokens = fcmTokenRepository.findAllByPushThreeLessThanEqual(nowTime);
        logger.debug("size : {}", fcmTokens.size());
        for (FcmToken target : fcmTokens) {
            if(!target.getUser().isAcceptPush()) continue;
            fcmService.sendMessageTo(target.getToken(), title, body);
            target.setPushThree(nowTime.plusDays(5));
            fcmTokenRepository.save(target);
            logger.debug("nowTime이 유지되고 있는가. : {}",nowTime);
        }

    }
}
