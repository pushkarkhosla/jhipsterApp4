package com.arttha.service.impl;

import com.arttha.service.BookEntityService;
import com.arttha.domain.BookEntity;
import com.arttha.repository.BookEntityRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link BookEntity}.
 */
@Service
@Transactional
public class BookEntityServiceImpl implements BookEntityService {

    private final Logger log = LoggerFactory.getLogger(BookEntityServiceImpl.class);

    private final BookEntityRepository bookEntityRepository;

    public BookEntityServiceImpl(BookEntityRepository bookEntityRepository) {
        this.bookEntityRepository = bookEntityRepository;
    }

    /**
     * Save a bookEntity.
     *
     * @param bookEntity the entity to save.
     * @return the persisted entity.
     */
    @Override
    public BookEntity save(BookEntity bookEntity) {
        log.debug("Request to save BookEntity : {}", bookEntity);
        return bookEntityRepository.save(bookEntity);
    }

    /**
     * Get all the bookEntities.
     *
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public List<BookEntity> findAll() {
        log.debug("Request to get all BookEntities");
        return bookEntityRepository.findAll();
    }


    /**
     * Get one bookEntity by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<BookEntity> findOne(Long id) {
        log.debug("Request to get BookEntity : {}", id);
        return bookEntityRepository.findById(id);
    }

    /**
     * Delete the bookEntity by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete BookEntity : {}", id);
        bookEntityRepository.deleteById(id);
    }
}
