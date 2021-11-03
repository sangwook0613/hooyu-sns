package com.status.backend.user.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    // SQL은 테이블의 컬럼명이 snack_id이기 때문에 조건절에 snack_id
    // SQL 일반 파라미터 쿼리, @Param 사용 X
//    @Query(value = "select location_id, user_id from location where latitude > ?1 and longitude", nativeQuery = true)
//    public List<Snack> selectSQLById1(int id);
}