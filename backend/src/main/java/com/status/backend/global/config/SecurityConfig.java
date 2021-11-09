package com.status.backend.global.config;

import com.status.backend.global.filter.JwtAuthFilter;
import com.status.backend.global.handler.CustomLogoutSuccessHandler;
import com.status.backend.global.handler.CustomOAuth2SuccessHandler;
import com.status.backend.global.service.CustomOAuth2UserService;
import com.status.backend.global.service.TokenService;
import com.status.backend.user.domain.Role;
import com.status.backend.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CustomOAuth2UserService customOAuth2UserService;
    private final CustomOAuth2SuccessHandler customOAuth2SuccessHandler;
    private final CustomLogoutSuccessHandler customLogoutSuccessHandler;
    private final TokenService tokenService;
    private final UserRepository userRepository;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().configurationSource(corsConfigurationSource())

                .and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                .headers()
                .frameOptions()
                .disable()

                .and()
                .authorizeRequests()
                .antMatchers("/h2-console/**","/error","/favicon.ico").permitAll()
                .antMatchers("/auth/**","/oauth2/**, api/v1/login").permitAll()
                .antMatchers("/api/v1/user/**", "/api/v1/content/**", "/api/v1/push/**","/api/v1/emotion/**").hasRole(Role.USER.name())
//                .antMatchers("/api/v1/**").permitAll()

                .antMatchers("/api/guest/**","/api/user/**","/push/**").permitAll()
                .anyRequest().authenticated()

                .and()
                .logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/")
                .logoutSuccessHandler(customLogoutSuccessHandler)

                .and()
                .oauth2Login()
                //front-end CI/CD 구현시 변경될 uri
//                .loginPage("https://k5a101.p.ssafy.io/")
//                .loginPage("http://localhost:8085")
                .userInfoEndpoint()
                .userService(customOAuth2UserService)

                .and()
                .successHandler(customOAuth2SuccessHandler);

        http.addFilterBefore(new JwtAuthFilter(tokenService,userRepository), UsernamePasswordAuthenticationFilter.class);

    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
                .antMatchers(HttpMethod.OPTIONS, "/**")
                .antMatchers(
                        "/h2-console/**",
                        "/favicon.ico",
                        "/swagger-ui.html/**",
                        "/configuration/**",
                        "/swagger-resources/**",
                        "/v2/api-docs",
                        "/webjars/**",
                        "/webjars/springfox-swagger-ui/*.{js,css}");
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
