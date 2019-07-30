package com.arttha.repository;

import com.arttha.domain.PushkarJhipster;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PushkarJhipster entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PushkarJhipsterRepository extends JpaRepository<PushkarJhipster, Long> {

}
