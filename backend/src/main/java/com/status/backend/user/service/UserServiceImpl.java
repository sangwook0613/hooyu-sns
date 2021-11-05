package com.status.backend.user.service;

import com.status.backend.content.dto.RequestContentTimeDto;
import com.status.backend.global.dto.DistDto;
import com.status.backend.global.exception.NoUserException;
import com.status.backend.global.exception.DuplicateNameException;
import com.status.backend.global.util.RadarMath;
import com.status.backend.user.domain.*;
import com.status.backend.user.dto.ResponseUserLocationDto;
import com.status.backend.user.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PrivateZoneRepository pzRepository;
    private final LocationRepository locationRepository;
    private static RadarMath radarMath = new RadarMath();

    Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Override
    public UserResponseDto getUserInfo(Long userPK) throws NoUserException {
        User user = userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        UserResponseDto userResponseDto = new UserResponseDto(user);
        logger.info("Service In");
        logger.info("user : {}", user);
        return userResponseDto;
    }

    public User getUserInfoTwo(Long userPK) throws NoUserException{
        return userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
    }

    @Override
    public String duplicateCheckName(String userName) throws NoUserException {
        if(userRepository.existsByName(userName))
            return "이미 존재하는 이름입니다.";
        else
            return "Success";
    }

    @Override
    public String changeName(Long userPK, String userName) throws NoUserException, DuplicateNameException {
        User user = userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        if(userRepository.existsByName(userName)){
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
    public String setUpPrivateZone(Long userPK, BigDecimal lat, BigDecimal lon) throws NoUserException {
        logger.debug("user pk check : {}", userPK);
        logger.debug("lat check : {}", lat);
        logger.debug("lon check : {}", lon);
        PrivateZone privateZone;
        if(pzRepository.existsByUserId(userPK)){
            privateZone = pzRepository.findByUserId(userPK).get();
            privateZone.setLatitude(lat);
            privateZone.setLongitude(lon);
        }else{
            privateZone = new PrivateZone(lat, lon);
            logger.debug("privatezone : {}", privateZone);

            User user = userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
            logger.info("user privateZone존재여부 : {}", user.getPrivateZones());

            privateZone.setUser(user);
            logger.info("user privateZone get(0) : {}", user.getPrivateZones().get(0));
            userRepository.save(user);
        }
            pzRepository.save(privateZone);
        return "Success";
    }

    @Override
    public String setPushAlarmReceive(Long userPK, Boolean accept) throws NoUserException {
        User user = userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        user.setAcceptPush(!user.isAcceptPush());
        userRepository.save(user);
        return "Success";
    }

    @Override
    public String setPushAlarmSync(Long userPK, Boolean sync) throws NoUserException {
        User user = userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        user.setAcceptSync(!user.isAcceptSync());
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
    public List<ResponseUserLocationDto> getUserList(Long userPK, BigDecimal lat, BigDecimal lon, int radius, List<ResponseUserLocationDto> pastList) throws NoUserException {
        User user = userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));

        // 유저가저와 범위와 location을 수정해준다.
        setUserLocation(user,lat,lon);

        //범위에 있는 ResponseUserLocationDto : List 가져오기
        List<ResponseUserLocationDto> nowList = getUserWithinRadius(user,lat,lon,radius);

        //비교 **주의** 초기 유저의 요청은 pastList가 null이다.

        //push

        //return
        return nowList;
    }

    @Override
    public List<ResponseUserLocationDto> getUserWithinRadius(User user, BigDecimal lat, BigDecimal lon, int radius) throws NoUserException {
        List<ResponseUserLocationDto> responseUserLocationDtoList = new ArrayList<>();

        // 범위에 있는 List 가져 옴 (현재 +- 0.04 오차를 두고 있음)
        List<Location> locationList = locationRepository.selectSQLBylatlon(lat,lon);
        for (int i = 0; i < locationList.size(); i++) {
            Location target = locationList.get(i);

            //본인인 경우 out
            if(target.getUser().getId() == user.getId()) continue;

            DistDto checkDist = radarMath.distance(lat,lon,target.getLatitude(),target.getLongitude());
            if(checkDist.getDist()>radius) continue;

            //privateZone안에 있는 여부check
            boolean userInPrivateZone = false;
            User targetUser = target.getUser();
            List<PrivateZone> privateZoneList = targetUser.getPrivateZones();
            if(privateZoneList.size()!=0){
                PrivateZone targetPrivateZone = privateZoneList.get(0);
                DistDto targetInPrivateZone = radarMath.distance(targetPrivateZone.getLatitude(), targetPrivateZone.getLongitude(),target.getLatitude(),target.getLongitude());
                //targetUser의 위치가 privateZone 100 안쪽에 있을때 true
                if(targetInPrivateZone.getDist()<100)
                    userInPrivateZone = true;
            }

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

    //test
    public void setUserLocation(User user, BigDecimal lat, BigDecimal lon) throws NoUserException {

        Location userLocation = user.getLocation();
        if(userLocation==null){
            userLocation = Location.builder().user(user).latitude(lat).longitude(lon).build();
        }else{
            userLocation.setLatitude(lat);
            userLocation.setLongitude(lon);
        }
        user.setLocation(userLocation);
        locationRepository.save(userLocation);
        userRepository.save(user);
    }

}
