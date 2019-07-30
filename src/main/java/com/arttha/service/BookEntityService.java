package com.arttha.service;

import com.arttha.domain.BookEntity;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link BookEntity}.
 */
public interface BookEntityService {

    /**
     * Save a bookEntity.
     *
     * @param bookEntity the entity to save.
     * @return the persisted entity.
     */
    BookEntity save(BookEntity bookEntity);

    /**
     * Get all the bookEntities.
     *
     * @return the list of entities.
     */
    List<BookEntity> findAll();


    /**
     * Get the "id" bookEntity.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<BookEntity> findOne(Long id);

    /**
     * Delete the "id" bookEntity.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
