package com.example.pushjob.user.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@NoArgsConstructor
@Getter @Setter @ToString
public class PrivateZone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column
    private String title;

    @Column(nullable = false, precision = 9, scale = 6)
    private BigDecimal latitude;

    @Column(nullable = false, precision = 9, scale = 6)
    private BigDecimal longitude;

    @Builder
    public PrivateZone(String title, BigDecimal lat, BigDecimal lon) {
        this.title = title;
        this.latitude = lat;
        this.longitude = lon;
    }

    public void setUser(User user) {
        if(this.user != null)   this.user.getPrivateZones().remove(this);

        this.user = user;
        user.getPrivateZones().add(this);
    }
}
