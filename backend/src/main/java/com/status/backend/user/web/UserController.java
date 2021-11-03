package com.status.backend.user.web;

import com.status.backend.global.dto.SuccessResponseDto;
import com.status.backend.global.exception.NoUserException;
import com.status.backend.global.service.ResponseGenerateService;
import com.status.backend.user.domain.User;
import com.status.backend.user.dto.*;
import com.status.backend.user.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
@RestController
public class UserController{

    private final UserServiceImpl userService;
    private final ResponseGenerateService responseGenerateService;

    Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/user/setup/{userPK}")
    public ResponseEntity<SuccessResponseDto> getUserInfo(@PathVariable Long userPK) throws NoUserException {
        logger.info("User Controller 진입 getUserInfo param {}", userPK);
        UserResponseDto userResponseDto = userService.getUserInfo(userPK);

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(userResponseDto);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

    @GetMapping("/user/test/{userPK}")
    public ResponseEntity<SuccessResponseDto> getUserInfoTwo(@PathVariable Long userPK) throws NoUserException {
        logger.info("User Controller 진입 getUserInfo param {}", userPK);
        User user = userService.getUserInfoTwo(userPK);

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(user);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

    @PostMapping("/user/duplicated/{userName}")
    public ResponseEntity<SuccessResponseDto> DuplicateCheckName(@PathVariable String userName) throws NoUserException {
        logger.trace("User Controller 진입  DuplicateCheckName param {}", userName);
        String message = userService.DuplicateCheckName(userName);

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

    @PostMapping("/user/nameSet/{userName}")
    public ResponseEntity<SuccessResponseDto> ChangeName(@PathVariable String userName) throws NoUserException {
        logger.trace("User Controller 진입 ChangeName param {}", userName);
        String message = userService.ChangeName(userName);

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

    @PostMapping("/user/emojiSet")
    public ResponseEntity<SuccessResponseDto> ChangeEmoji(@RequestBody @Valid EmojiDto emojiDto) throws NoUserException {
        logger.trace("User Controller 진입 ChangeEmoji param {}", emojiDto);
        String message = userService.ChangeEmoji(emojiDto.getUserPK(),emojiDto.getUserEmoji());

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }


    @PostMapping("/user/setPrivate")
    public ResponseEntity<SuccessResponseDto> SetUpPrivateZone(@RequestBody @Valid PrivateZoneDto privateZoneDto) throws NoUserException {
        logger.trace("User Controller 진입 SetUpPrivateZone param {}", privateZoneDto);
        String message = userService.SetUpPrivateZone(privateZoneDto.getUserPK(), privateZoneDto.getLat(),privateZoneDto.getLon());

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }


    @PostMapping("/user/push/accept")
    public ResponseEntity<SuccessResponseDto> SetPushAlarmReceive(@RequestBody @Valid PushAlarmDto pushAlarmDto) throws NoUserException {
        logger.trace("User Controller 진입 SetPushAlarmReceive param {}", pushAlarmDto);
        String message = userService.SetPushAlarmReceive(pushAlarmDto.getUserPK(),pushAlarmDto.getAccept());

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }


    @PostMapping("/user/push/sync")
    public ResponseEntity<SuccessResponseDto> SetPushAlarmSync(@RequestBody @Valid PushAlarmDto pushAlarmDto) throws NoUserException {
        logger.trace("User Controller 진입 SetPushAlarmSync param {}", pushAlarmDto);
        String message = userService.SetPushAlarmSync(pushAlarmDto.getUserPK(),pushAlarmDto.getSync());

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }


    @PostMapping("/user/push/radius")
    public ResponseEntity<SuccessResponseDto> SetPushAlarmRadius(@RequestBody @Valid PushAlarmDto pushAlarmDto) throws NoUserException {
        logger.trace("User Controller 진입 SetPushAlarmRadius param {}", pushAlarmDto);
        String message = userService.SetPushAlarmRadius(pushAlarmDto.getUserPK(),pushAlarmDto.getRadius());

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }


    @PostMapping("/user/radar")
    public ResponseEntity<SuccessResponseDto> getUserWithinRadius(@RequestBody @Valid RequestRadiusDto requestRadiusDto) throws NoUserException {
        logger.trace("User Controller 진입 getUserWithinRadius param {}", requestRadiusDto);
        List<UserMapping> list = userService.getUserWithinRadius(requestRadiusDto.getUserPK(),requestRadiusDto.getLat(),requestRadiusDto.getLon(), requestRadiusDto.getRadius());

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(list);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

    @PostMapping("/user/radars")
    public ResponseEntity<SuccessResponseDto> getListUserWithinRadius(@RequestBody @Valid RequestUserLocationDto RequestUserLocationDto) throws NoUserException {
        logger.trace("User Controller 진입 getUserWithinRadius param {}", RequestUserLocationDto);
        List<UserMapping> list = userService.getUserWithinRadius(RequestUserLocationDto.getRequestRadiusDto().getUserPK(),RequestUserLocationDto.getRequestRadiusDto().getLat(),RequestUserLocationDto.getRequestRadiusDto().getLon(), RequestUserLocationDto.getRequestRadiusDto().getRadius());

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(list);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }
}
