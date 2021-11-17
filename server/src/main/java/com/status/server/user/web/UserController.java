package com.status.server.user.web;

import com.status.server.global.dto.SuccessResponseDto;
import com.status.server.global.exception.*;
import com.status.server.global.service.ResponseGenerateService;
import com.status.server.global.util.SecurityUtil;
import com.status.server.user.domain.User;
import com.status.server.user.dto.*;
import com.status.server.user.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
@RestController
public class UserController {

    private final UserServiceImpl userService;
    private final ResponseGenerateService responseGenerateService;

    Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/setup/{userPK}")
    public ResponseEntity<SuccessResponseDto> getUserInfo(@PathVariable Long userPK) throws NoUserException {
        logger.debug("User Controller 진입 getUserInfo param {}", userPK);
        UserResponseDto userResponseDto = userService.getUserInfo(SecurityUtil.getCurrentUserId());

        logger.debug("User Controller 진입 userResponseDto {}", userResponseDto);
        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(userResponseDto);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

    @GetMapping("/test/{userPK}")
    public ResponseEntity<SuccessResponseDto> getUserInfoTwo(@PathVariable Long userPK) throws NoUserException {
        logger.debug("User Controller 진입 getUserInfo param {}", userPK);
        User user = userService.getUserInfoTwo(SecurityUtil.getCurrentUserId());

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(user);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

    @GetMapping("/duplicated/{userName}")
    public ResponseEntity<SuccessResponseDto> duplicateCheckName(@PathVariable String userName) throws NoUserException {
        logger.debug("User Controller 진입  duplicateCheckName param {}", userName);
        String message = userService.duplicateCheckName(userName);

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

    @PostMapping("/nameSet")
    public ResponseEntity<SuccessResponseDto> changeName(@RequestBody NameDto nameDto) throws NoUserException, DuplicateNameException {
        logger.trace("User Controller 진입 changeName param {}", nameDto.getUserName());
        String message = userService.changeName(SecurityUtil.getCurrentUserId(), nameDto.getUserName());

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

    @PostMapping("/emojiSet")
    public ResponseEntity<SuccessResponseDto> changeEmoji(@RequestBody @Valid EmojiDto emojiDto) throws NoUserException {
        logger.trace("User Controller 진입 ChangeEmoji param {}", emojiDto);
        String message = userService.changeEmoji(SecurityUtil.getCurrentUserId(), emojiDto.getUserEmoji());

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

    @PostMapping("/setPrivate")
    public ResponseEntity<SuccessResponseDto> setUpPrivateZone(@RequestBody @Valid PrivateZoneDto privateZoneDto) throws NoUserException {
        logger.trace("User Controller 진입 SetUpPrivateZone param {}", privateZoneDto);
        String message = userService.setUpPrivateZone(SecurityUtil.getCurrentUserId(), privateZoneDto.getTitle(), privateZoneDto.getLat(), privateZoneDto.getLon());

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

    @GetMapping("/private/{userPK}")
    public ResponseEntity<SuccessResponseDto> getPrivateZone(@PathVariable Long userPK) throws NoUserException {
        logger.trace("User Controller 진입 getPrivateZone param {}", userPK);
        List<ResponsePrivateZoneDto> responsePrivateZoneDtoList = userService.getPrivateZone(SecurityUtil.getCurrentUserId());

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(responsePrivateZoneDtoList);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

    @DeleteMapping("/deletePrivate")
    public ResponseEntity<SuccessResponseDto> deletePrivateZone(@RequestBody @Valid RequestDeletePZDto requestDeletePZDto) throws NoTargetException, NoUserException {
        logger.trace("User Controller 진입 SetUpPrivateZone param {}", requestDeletePZDto);
        String message = userService.deletePrivateZone(SecurityUtil.getCurrentUserId(), requestDeletePZDto.getPzPK());

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }


    @PostMapping("/push")
    public ResponseEntity<SuccessResponseDto> setPushAlarmReceive(@RequestBody @Valid PushAlarmDto pushAlarmDto) throws Exception {
        logger.trace("User Controller 진입 SetPushAlarmReceive param {}", pushAlarmDto);
        String message = userService.setAllPush(SecurityUtil.getCurrentUserId(), pushAlarmDto.getAccept(), pushAlarmDto.getSync(), pushAlarmDto.getRadius());

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }
//    @PostMapping("/push/accept")
//    public ResponseEntity<SuccessResponseDto> setPushAlarmReceive(@RequestBody @Valid PushAlarmDto pushAlarmDto) throws NoUserException {
//        logger.trace("User Controller 진입 SetPushAlarmReceive param {}", pushAlarmDto);
//        String message = userService.setPushAlarmReceive(pushAlarmDto.getUserPK(),pushAlarmDto.getAccept());
//
//        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);
//
//        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
//    }
//
//
//    @PostMapping("/push/sync")
//    public ResponseEntity<SuccessResponseDto> setPushAlarmSync(@RequestBody @Valid PushAlarmDto pushAlarmDto) throws NoUserException {
//        logger.trace("User Controller 진입 SetPushAlarmSync param {}", pushAlarmDto);
//        String message = userService.setPushAlarmSync(pushAlarmDto.getUserPK(),pushAlarmDto.getSync());
//
//        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);
//
//        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
//    }
//
//
//    @PostMapping("/push/radius")
//    public ResponseEntity<SuccessResponseDto> setPushAlarmRadius(@RequestBody @Valid PushAlarmDto pushAlarmDto) throws NoUserException {
//        logger.trace("User Controller 진입 SetPushAlarmRadius param {}", pushAlarmDto);
//        String message = userService.setPushAlarmRadius(pushAlarmDto.getUserPK(),pushAlarmDto.getRadius());
//
//        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);
//
//        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
//    }

    @PostMapping("/radar")
    public ResponseEntity<SuccessResponseDto> getListUserWithinRadius(@RequestBody RequestUserLocationDto requestUserLocationDto) throws NoUserException, NoBrowserTokenException, IOException {
        logger.trace("User Controller 진입 getUserWithinRadius param {}", requestUserLocationDto);
        List<ResponseUserLocationDto> list = userService.getUserList(SecurityUtil.getCurrentUserId(),
                requestUserLocationDto.getRequestRadiusDto().getLat(), requestUserLocationDto.getRequestRadiusDto().getLon(),
                requestUserLocationDto.getRequestRadiusDto().getRadius(),
                requestUserLocationDto.getList());

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(list);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

    @PutMapping("/killed")
    public ResponseEntity<SuccessResponseDto> setKilled(@RequestParam Long userPK) throws NoUserException {
        logger.trace("User Controller 진입 getListUserWithinRadius param {}", userPK);
        String message = userService.killApp(SecurityUtil.getCurrentUserId());

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

    @PutMapping("/wakeup")
    public ResponseEntity<SuccessResponseDto> setAlive(@RequestParam Long userPK) throws NoUserException {
        logger.trace("User Controller 진입 getListUserWithinRadius param {}", userPK);
        String message = userService.aliveApp(SecurityUtil.getCurrentUserId());

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }

    @DeleteMapping("/drop")
    public ResponseEntity<SuccessResponseDto> dropMembership(@RequestParam Long userPK) throws NoUserException, NoAuthorityUserException, NoContentException {
        logger.trace("User Controller 진입 getListUserWithinRadius param {}", userPK);
        String message = userService.deleteUser(SecurityUtil.getCurrentUserId());

        SuccessResponseDto successResponseDto = responseGenerateService.generateSuccessResponse(message);

        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }
}
