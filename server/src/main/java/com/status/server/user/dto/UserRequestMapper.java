package com.status.server.user.dto;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class UserRequestMapper {

    Logger logger = LoggerFactory.getLogger(UserRequestMapper.class);

    public UserRequestDto toDto(OAuth2User oAuth2User) {
        Map<String, Object> attributes = oAuth2User.getAttributes();
        logger.debug("oAuth2User.getAttributes() : {}",attributes);

        if(attributes.get("sub")!=null){
            return UserRequestDto.builder()
                    .email((String)attributes.get("email"))
                    .name((String)attributes.get("name"))
                    .profileImg((String)attributes.get("picture"))
                    .build();
        }else{
            Map<String,Object> response = (Map<String, Object>) attributes.get("kakao_account");
            Map<String, Object> profile = (Map<String, Object>) response.get("profile");
            return UserRequestDto.builder()
                    .name((String)profile.get("nickname"))
                    .email((String)response.get("email"))
                    .profileImg((String)profile.get("profile_image_url"))
                    .build();
        }
    }

//    public UserFindRequest toFindDto(UserDto oAuth2UserDto) {
//        return new UserFindRequest(oAuth2UserDto.getEmail());
//    }
}