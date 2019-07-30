package com.arttha.repository;

import com.arttha.domain.BookEntity;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the BookEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BookEntityRepository extends JpaRepository<BookEntity, Long> {

}
