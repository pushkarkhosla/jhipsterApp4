package com.arttha.service;

import com.arttha.domain.PushkarJhipster;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link PushkarJhipster}.
 */
public interface PushkarJhipsterService {

    /**
     * Save a pushkarJhipster.
     *
     * @param pushkarJhipster the entity to save.
     * @return the persisted entity.
     */
    PushkarJhipster save(PushkarJhipster pushkarJhipster);

    /**
     * Get all the pushkarJhipsters.
     *
     * @return the list of entities.
     */
    List<PushkarJhipster> findAll();


    /**
     * Get the "id" pushkarJhipster.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PushkarJhipster> findOne(Long id);

    /**
     * Delete the "id" pushkarJhipster.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
