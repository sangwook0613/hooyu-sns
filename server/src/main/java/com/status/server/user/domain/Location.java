package com.status.server.user.domain;

import com.status.server.global.domain.BaseTime;
import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;

@Getter @Setter
@ToString
@NoArgsConstructor
@Entity
public class Location extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "location_id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false, precision = 9, scale = 6)
    private BigDecimal latitude;

    @Column(nullable = false, precision = 9, scale = 6)
    private BigDecimal longitude;

    @Builder
    public Location(User user, BigDecimal latitude, BigDecimal longitude){
        this.user = user;
        this.latitude = latitude;
        this.longitude  = longitude;
    }

//    @Builder
//    public Location(BigDecimal latitude, BigDecimal longitude){
//        this.latitude = latitude;
//        this.longitude  = longitude;
//    }
}
