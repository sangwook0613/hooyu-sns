package com.status.backend.user.service;

import com.status.backend.global.exception.NoUserException;
import com.status.backend.user.domain.*;
import com.status.backend.user.dto.ResponseUserLocationDto;
import com.status.backend.user.dto.UserMapping;
import com.status.backend.user.dto.UserResponseDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PrivateZoneRepository pzRepository;
    private final LocationRepository locationRepository;

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
    public String DuplicateCheckName(String userName) throws NoUserException {
        if(userRepository.existsByName(userName))
            return "이미 존재하는 이름입니다.";
        else
            return "Success";
    }

    @Override
    public String ChangeName(String userName) throws NoUserException {
        User user = userRepository.findByName(userName).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        user.setName(userName);
        userRepository.save(user);
        return "Success";
    }

    @Override
    public String ChangeEmoji(Long userPK, String userEmoji) throws NoUserException {
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
    public String SetUpPrivateZone(Long userPK, BigDecimal lat, BigDecimal lon) throws NoUserException {
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
            logger.debug("user privateZone존재여부 : {}", user.getPrivateZones());

            privateZone.setUser(user);
            logger.debug("user privateZone get(0) : {}", user.getPrivateZones().get(0));
            userRepository.save(user);
        }
            pzRepository.save(privateZone);
        return "Success";
    }

    @Override
    public String SetPushAlarmReceive(Long userPK, Boolean accept) throws NoUserException {
        User user = userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        user.setAcceptPush(!user.isAcceptPush());
        userRepository.save(user);
        return "Success";
    }

    @Override
    public String SetPushAlarmSync(Long userPK, Boolean sync) throws NoUserException {
        User user = userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        user.setAcceptSync(!user.isAcceptSync());
        userRepository.save(user);
        return "Success";
    }

    @Override
    public String SetPushAlarmRadius(Long userPK, int radius) throws NoUserException {
        User user = userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));
        user.setAcceptRadius(radius);
        userRepository.save(user);
        return "Success";
    }

    @Override
    public List<UserMapping> getUserWithinRadius(Long userPK, BigDecimal lat, BigDecimal lon, int radius) throws NoUserException {

        return null;
    }

    @Transactional
    @Override
    public List<ResponseUserLocationDto> getUserList(Long userPK, BigDecimal lat, BigDecimal lon, int radius, List<ResponseUserLocationDto> pastList) throws NoUserException {
        List<ResponseUserLocationDto> nowList = null;
        // 유저가저와 범위와 location을 수정해준다.
        User user = userRepository.findById(userPK).orElseThrow(() -> new NoUserException("해당하는 사용자가 없습니다."));

        //비교

        //push

        //return
        return nowList;
    }
}
