package com.status.server.user.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.status.server.content.domain.RecordTime;
import com.status.server.content.domain.RecordTimeRepository;
import com.status.server.content.domain.Type;
import com.status.server.content.dto.RequestContentTimeDto;
import com.status.server.fcm.domain.FcmToken;
import com.status.server.fcm.domain.FcmTokenRepository;
import com.status.server.fcm.service.FcmService;
import com.status.server.global.domain.Token;
import com.status.server.global.dto.DistDto;
import com.status.server.global.exception.*;
import com.status.server.global.service.TokenService;
import com.status.server.global.util.RadarMath;
import com.status.server.user.domain.*;
import com.status.server.user.dto.ResponseUserLocationDto;
import com.status.server.user.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.math.BigDecimal;
import java.security.GeneralSecurityException;
import java.time.LocalDateTime;
import java.util.*;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PrivateZoneRepository pzRepository;
    private final LocationRepository locationRepository;
    private final FcmTokenRepository fcmTokenRepository;

    private final RecordTimeRepository recordTimeRepository;
    private final TokenService tokenService;
    private final FcmService fcmService;

    private static RadarMath radarMath = new RadarMath();
    private static final String GOOGLE_CLIENT_ID = "5095342969-dcob776t7ckfeu2gddkb2j4ke2cprfst.apps.googleusercontent.com";
    Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Transactional
    @Override
    public Token googleLogin(String googleIdToken) throws Exception {
        HttpTransport transport = new NetHttpTransport();
        JsonFactory jsonFactory = JacksonFactory.getDefaultInstance();

        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                .setAudience(Collections.singletonList(GOOGLE_CLIENT_ID))
                .build();
        String email = null;
        try {
            GoogleIdToken idToken = verifier.verify(googleIdToken);
            if (idToken == null) throw new GoogleLoginFailException("Google에서 인증하지 않았습니다.");

            GoogleIdToken.Payload payload = idToken.getPayload();
            email = payload.getEmail();
        } catch (GeneralSecurityException e) {
            logger.debug("{}", e.getLocalizedMessage());
        } catch (IOException e) {
            logger.debug("{}", e.getLocalizedMessage());
        }

        String convertPw = UUID.randomUUID().toString().replace("-", "");
        logger.debug("로그인 user Name : {}", convertPw);

        User user = userRepository.findByEmail(email).orElse(User.builder().name(convertPw).email(email).role(Role.USER).build());
        userRepository.save(user);

        //회원 초기 세팅 DB값
        if (!locationRepository.existsByUserId(user.getId())) {
            Location location = Location.builder().user(user).latitude(new BigDecimal(0)).longitude(new BigDecimal(0)).build();
            locationRepository.save(location);
            RecordTime recordTime = RecordTime.builder().build();
            user.setRecordTime(recordTime);
            recordTimeRepository.save(recordTime);
        }

        //JWT 만들기 및 전달하기
        Token token = tokenService.generateToken(user.getId(), user.getName(), "USER");
        logger.debug("성공적인 로그인 진행중 만든 token : {}", token);

        //회원 테이블에 삽입
        user.updateRefreshToken(token.getRefresh_token());
        userRepository.save(user);

        return token;
    }

    @Override
    public String killApp(Long userPK) throws NoUserException {
        User user = userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        logger.debug("alive 변환 !!!!!! {} ", user.isAlive());
        user.setAlive(Boolean.FALSE);
        user.setKilled(LocalDateTime.now());
        userRepository.save(user);
        logger.debug("alive 변환 !!!!!! {} ", user.isAlive());
        return "Success";
    }

    @Override
    public String aliveApp(Long userPK) throws NoUserException {
        User user = userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        user.setAlive(Boolean.TRUE);
        userRepository.save(user);
        return "Success";
    }

    @Override
    public UserResponseDto getUserInfo(Long userPK) throws NoUserException {
        User user = userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        UserResponseDto userResponseDto = new UserResponseDto(user);
        logger.debug("Service In");
        logger.debug("user : {}", user);
        return userResponseDto;
    }

    public User getUserInfoTwo(Long userPK) throws NoUserException {
        return userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
    }

    @Override
    public String duplicateCheckName(String userName) throws NoUserException {
        if (userRepository.existsByName(userName))
            return "이미 존재하는 이름입니다.";
        else
            return "Success";
    }

    @Override
    public String changeName(Long userPK, String userName) throws NoUserException, DuplicateNameException {
        User user = userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        if (userRepository.existsByName(userName)) {
            throw new DuplicateNameException("이미 존재하는 이름입니다.");
        }
        user.setName(userName);
        userRepository.save(user);
        return "Success";
    }

    @Override
    public String changeEmoji(Long userPK, String userEmoji) throws NoUserException {
        User user = userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        user.setUserEmoji(userEmoji);
        userRepository.save(user);
        return "Success";
    }

    /*
    현재는 privateZone은 유일해야한다.
     */
    @Transactional
    @Override
    public String setUpPrivateZone(Long userPK, String title, BigDecimal lat, BigDecimal lon) throws NoUserException {
        logger.debug("user pk check : {}", userPK);
        logger.debug("lat check : {}", lat);
        logger.debug("lon check : {}", lon);

        PrivateZone privateZone = PrivateZone.builder().title(title).lat(lat).lon(lon).build();
        logger.debug("privatezone : {}", privateZone);

        User user = userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        logger.debug("user privateZone존재여부 : {}", user.getPrivateZones());

        privateZone.setUser(user);
        logger.debug("user privateZone get(0) : {}", user.getPrivateZones().get(0));

        userRepository.save(user);
        pzRepository.save(privateZone);
        return "Success";
    }

    @Override
    public String deletePrivateZone(Long userPK, String title, BigDecimal lat, BigDecimal lon) throws NoTargetException {
        PrivateZone pz = pzRepository.findByUserIdAndTitleAndLatitudeAndLongitude(userPK,title,lat,lon).orElseThrow(() -> new NoTargetException("해당하는 private-zone은 없습니다"));
        pzRepository.delete(pz);
        return "Success";
    }

    public String setAllPush(Long userPK, Boolean accept, Boolean sync, int radius) throws Exception {
        User user = userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        if (accept == null || sync == null || radius < 0) throw new Exception("환경설정 실패");
        user.setAcceptPush(accept);
        user.setAcceptSync(sync);
        user.setAcceptRadius(radius);
        userRepository.save(user);
        return "Success";
    }

    @Override
    public String setPushAlarmReceive(Long userPK, Boolean accept) throws NoUserException {
        User user = userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        user.setAcceptPush(accept);
        userRepository.save(user);
        return "Success";
    }

    @Override
    public String setPushAlarmSync(Long userPK, Boolean sync) throws NoUserException {
        User user = userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        user.setAcceptSync(sync);
        userRepository.save(user);
        return "Success";
    }

    @Override
    public String setPushAlarmRadius(Long userPK, int radius) throws NoUserException {
        User user = userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        user.setAcceptRadius(radius);
        userRepository.save(user);
        return "Success";
    }

    @Transactional
    @Override
    public List<ResponseUserLocationDto> getUserList(Long userPK, BigDecimal lat, BigDecimal lon, int radius, List<ResponseUserLocationDto> pastList) throws NoUserException, NoBrowserTokenException, IOException {
        User user = userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));

        //유저의 Push message 범위를 변경하기(체크 후)
        if (user.isAcceptSync()) {
            user.setAcceptRadius(radius);
            userRepository.save(user);
        }

        // 유저가저와 범위와 location을 수정해준다.
        setUserLocation(user, lat, lon);

        //범위에 있는 ResponseUserLocationDto : List 가져오기
        List<ResponseUserLocationDto> nowList = getUserWithinRadius(user, lat, lon, radius);

        if (user.isAcceptPush() && fcmTokenRepository.existsByUserId(userPK)) {
            sendPush(user, nowList, pastList);
        }

        //return
        return nowList;
    }

    private void sendPush(User user, List<ResponseUserLocationDto> nowList, List<ResponseUserLocationDto> pastList) throws NoBrowserTokenException, IOException {
        int countOfNew = 0;
        Type targetContent = null;

        HashMap<String, RequestContentTimeDto> pushMap = new HashMap<>();

        for (ResponseUserLocationDto tmp : pastList) {
            pushMap.put(tmp.getName(), tmp.getContentTime());
        }

        for (int i = 0; i < nowList.size(); i++) {
            ResponseUserLocationDto target = nowList.get(i);
            if (!pushMap.containsKey(target.getName())) {
                countOfNew++;
            } else {
                RequestContentTimeDto past = pushMap.get(target.getName());
                if (past.getStatus().equals(target.getContentTime().getStatus())) {
                    targetContent = Type.STATUS;
                } else if (past.getImages().equals(target.getContentTime().getImages())) {
                    targetContent = Type.IMAGE;
                } else if (past.getSurvey().equals(target.getContentTime().getSurvey())) {
                    targetContent = Type.SURVEY;
                }
            }
        }

        LocalDateTime nowTime = LocalDateTime.now();
        logger.debug("LocalDataTime : {}", nowTime);
        FcmToken targetToken = fcmTokenRepository.findByUserId(user.getId()).orElseThrow(() -> new NoBrowserTokenException("브라우저토큰이 없습니다...."));
        logger.debug("FCMToekn : {}", targetToken);
//        logger.debug("LocalDataTime check : {}",nowTime.isAfter(null));
        //push

//        //장기 미 사용자 까꿍 message
//        logger.debug("nowTime null Exception check : {}", nowTime.isAfter(LocalDateTime.now()));
//        if (targetToken.getPushThree() != null && nowTime.isAfter(targetToken.getPushThree())) {
//            String title = "주변 사람들이 당신의 생각을 궁금해하고 있어요!";
//            String body = "클릭해서 컨텐츠를 작성해보세요";
//            fcmService.sendMessageTo(targetToken.getToken(), title, body);
//            targetToken.setPushThree(nowTime.plusDays(5));
//        }

        if (countOfNew != 0 && (targetToken.getPushOne() == null || nowTime.isAfter(targetToken.getPushOne()))) {
            String title = "반경 내에 " + countOfNew + "명의 사람이 새로 들어왔어요!";
            String body = "클릭해서 확인해보세요";
            fcmService.sendMessageTo(targetToken.getToken(), title, body);
            targetToken.setPushOne(nowTime.plusHours(3));
        }

        if (targetContent != null && (targetToken.getPushTwo() == null || nowTime.isAfter(targetToken.getPushTwo()))) {
            String title = "누군가 새 " + targetContent.getTitle() + "를 올렸어요!";
            String body = "클릭해서 확인해보세요";
            fcmService.sendMessageTo(targetToken.getToken(), title, body);
            targetToken.setPushTwo(nowTime.plusHours(3));
        }

        fcmTokenRepository.save(targetToken);

    }

    @Override
    public List<ResponseUserLocationDto> getUserWithinRadius(User user, BigDecimal lat, BigDecimal lon, int radius) throws NoUserException {
        List<ResponseUserLocationDto> responseUserLocationDtoList = new ArrayList<>();

        // 범위에 있는 List 가져 옴 (현재 +- 0.04 오차를 두고 있음)
        List<Location> locationList = locationRepository.selectSQLBylatlon(lat, lon);
        for (int i = 0; i < locationList.size(); i++) {
            Location target = locationList.get(i);
            User targetUser = target.getUser();

            // 앱을 끈 사람은 out
            if (!targetUser.isAlive()) continue;

            //본인인 경우 out
            if (target.getUser().getId() == user.getId()) continue;

            DistDto checkDist = radarMath.distance(lat, lon, target.getLatitude(), target.getLongitude());
            if (checkDist.getDist() > radius) continue;

            //privateZone안에 있는 여부check
            boolean userInPrivateZone = false;
            List<PrivateZone> privateZoneList = targetUser.getPrivateZones();
            for (int j = 0; j < privateZoneList.size(); j++) {
                PrivateZone targetPrivateZone = privateZoneList.get(i);
                DistDto targetInPrivateZone = radarMath.distance(targetPrivateZone.getLatitude(), targetPrivateZone.getLongitude(), target.getLatitude(), target.getLongitude());
                //targetUser의 위치가 privateZone 100 안쪽에 있을때 true
                if (targetInPrivateZone.getDist() < 100) {
                    userInPrivateZone = true;
                    break;
                }
            }

            //단일 PZ일때
//            if (privateZoneList.size() != 0) {
//                PrivateZone targetPrivateZone = privateZoneList.get(0);
//                DistDto targetInPrivateZone = radarMath.distance(targetPrivateZone.getLatitude(), targetPrivateZone.getLongitude(), target.getLatitude(), target.getLongitude());
//                //targetUser의 위치가 privateZone 100 안쪽에 있을때 true
//                if (targetInPrivateZone.getDist() < 100)
//                    userInPrivateZone = true;
//            }

            //targetUser의 컨텐츠 time기록을 넘겨준다.
            RequestContentTimeDto contentTimeDto = new RequestContentTimeDto(target.getUser().getRecordTime());

            //범위안에 있는 location
            ResponseUserLocationDto now = ResponseUserLocationDto.builder()
                    .name(targetUser.getName())
                    .emoji(targetUser.getUserEmoji())
                    .distDto(checkDist)
                    .privateZone(userInPrivateZone)
                    .contentTimeDto(contentTimeDto)
                    .build();

            responseUserLocationDtoList.add(now);
        }

        return responseUserLocationDtoList;
    }

    public void setUserLocation(User user, BigDecimal lat, BigDecimal lon) throws NoUserException {

        Location userLocation = locationRepository.findByUserId(user.getId()).orElse(null);
        if (userLocation == null) {
            userLocation = Location.builder().user(user).latitude(lat).longitude(lon).build();
        } else {
            userLocation.setLatitude(lat);
            userLocation.setLongitude(lon);
        }
        locationRepository.save(userLocation);
//        user.setLocation(userLocation);
//        userRepository.save(user);
    }

}
