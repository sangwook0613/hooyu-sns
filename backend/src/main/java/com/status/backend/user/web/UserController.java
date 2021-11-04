package com.status.backend.user.web;

import com.status.backend.global.dto.SuccessResponseDto;
import com.status.backend.global.exception.NoUserException;
import com.status.backend.global.exception.duplicateNameException;
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

    @GetMapping("/setup/{userPK}")
    public ResponseEntity<SuccessResponseDto> getUserInfo(@PathVariable Long userPK) throws NoUserException {
        logger.info("User Controller 진입 getUserInfo param {}", userPK);
        UserResponseDto userResponseDto = userService.getUserInfo(userPK);

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(userResponseDto);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

    @GetMapping("/test/{userPK}")
    public ResponseEntity<SuccessResponseDto> getUserInfoTwo(@PathVariable Long userPK) throws NoUserException {
        logger.info("User Controller 진입 getUserInfo param {}", userPK);
        User user = userService.getUserInfoTwo(userPK);

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(user);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

    @PostMapping("/duplicated/{userName}")
    public ResponseEntity<SuccessResponseDto> duplicateCheckName(@PathVariable String userName) throws NoUserException {
        logger.trace("User Controller 진입  duplicateCheckName param {}", userName);
        String message = userService.duplicateCheckName(userName);

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

    @PostMapping("/nameSet")
    public ResponseEntity<SuccessResponseDto> changeName(@RequestBody NameDto nameDto) throws NoUserException, duplicateNameException {
        logger.trace("User Controller 진입 changeName param {}", nameDto.getUserName());
        String message = userService.changeName(nameDto.getUserPK(), nameDto.getUserName());

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

    @PostMapping("/emojiSet")
    public ResponseEntity<SuccessResponseDto> changeEmoji(@RequestBody @Valid EmojiDto emojiDto) throws NoUserException {
        logger.trace("User Controller 진입 ChangeEmoji param {}", emojiDto);
        String message = userService.changeEmoji(emojiDto.getUserPK(),emojiDto.getUserEmoji());

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }


    @PostMapping("/setPrivate")
    public ResponseEntity<SuccessResponseDto> setUpPrivateZone(@RequestBody @Valid PrivateZoneDto privateZoneDto) throws NoUserException {
        logger.trace("User Controller 진입 SetUpPrivateZone param {}", privateZoneDto);
        String message = userService.setUpPrivateZone(privateZoneDto.getUserPK(), privateZoneDto.getLat(),privateZoneDto.getLon());

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }


    @PostMapping("/push/accept")
    public ResponseEntity<SuccessResponseDto> setPushAlarmReceive(@RequestBody @Valid PushAlarmDto pushAlarmDto) throws NoUserException {
        logger.trace("User Controller 진입 SetPushAlarmReceive param {}", pushAlarmDto);
        String message = userService.setPushAlarmReceive(pushAlarmDto.getUserPK(),pushAlarmDto.getAccept());

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }


    @PostMapping("/push/sync")
    public ResponseEntity<SuccessResponseDto> setPushAlarmSync(@RequestBody @Valid PushAlarmDto pushAlarmDto) throws NoUserException {
        logger.trace("User Controller 진입 SetPushAlarmSync param {}", pushAlarmDto);
        String message = userService.setPushAlarmSync(pushAlarmDto.getUserPK(),pushAlarmDto.getSync());

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }


    @PostMapping("/push/radius")
    public ResponseEntity<SuccessResponseDto> setPushAlarmRadius(@RequestBody @Valid PushAlarmDto pushAlarmDto) throws NoUserException {
        logger.trace("User Controller 진입 SetPushAlarmRadius param {}", pushAlarmDto);
        String message = userService.setPushAlarmRadius(pushAlarmDto.getUserPK(),pushAlarmDto.getRadius());

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

    @PostMapping("/radar")
    public ResponseEntity<SuccessResponseDto> getListUserWithinRadius(@RequestBody RequestUserLocationDto requestUserLocationDto) throws NoUserException {
        logger.trace("User Controller 진입 getUserWithinRadius param {}", requestUserLocationDto);
        List<ResponseUserLocationDto> list = userService.getUserList(requestUserLocationDto.getRequestRadiusDto().getUserPK(),
                requestUserLocationDto.getRequestRadiusDto().getLat(),requestUserLocationDto.getRequestRadiusDto().getLon(),
                requestUserLocationDto.getRequestRadiusDto().getRadius(),
                requestUserLocationDto.getList());

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(list);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }
}