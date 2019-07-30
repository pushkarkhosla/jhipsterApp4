package com.arttha.web.rest;

import com.arttha.domain.BookEntity;
import com.arttha.service.BookEntityService;
import com.arttha.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.arttha.domain.BookEntity}.
 */
@RestController
@RequestMapping("/api")
public class BookEntityResource {

    private final Logger log = LoggerFactory.getLogger(BookEntityResource.class);

    private static final String ENTITY_NAME = "bookEntity";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BookEntityService bookEntityService;

    public BookEntityResource(BookEntityService bookEntityService) {
        this.bookEntityService = bookEntityService;
    }

    /**
     * {@code POST  /book-entities} : Create a new bookEntity.
     *
     * @param bookEntity the bookEntity to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bookEntity, or with status {@code 400 (Bad Request)} if the bookEntity has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/book-entities")
    public ResponseEntity<BookEntity> createBookEntity(@RequestBody BookEntity bookEntity) throws URISyntaxException {
        log.debug("REST request to save BookEntity : {}", bookEntity);
        if (bookEntity.getId() != null) {
            throw new BadRequestAlertException("A new bookEntity cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BookEntity result = bookEntityService.save(bookEntity);
        return ResponseEntity.created(new URI("/api/book-entities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /book-entities} : Updates an existing bookEntity.
     *
     * @param bookEntity the bookEntity to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bookEntity,
     * or with status {@code 400 (Bad Request)} if the bookEntity is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bookEntity couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/book-entities")
    public ResponseEntity<BookEntity> updateBookEntity(@RequestBody BookEntity bookEntity) throws URISyntaxException {
        log.debug("REST request to update BookEntity : {}", bookEntity);
        if (bookEntity.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        BookEntity result = bookEntityService.save(bookEntity);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, bookEntity.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /book-entities} : get all the bookEntities.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bookEntities in body.
     */
    @GetMapping("/book-entities")
    public List<BookEntity> getAllBookEntities() {
        log.debug("REST request to get all BookEntities");
        return bookEntityService.findAll();
    }

    /**
     * {@code GET  /book-entities/:id} : get the "id" bookEntity.
     *
     * @param id the id of the bookEntity to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bookEntity, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/book-entities/{id}")
    public ResponseEntity<BookEntity> getBookEntity(@PathVariable Long id) {
        log.debug("REST request to get BookEntity : {}", id);
        Optional<BookEntity> bookEntity = bookEntityService.findOne(id);
        return ResponseUtil.wrapOrNotFound(bookEntity);
    }

    /**
     * {@code DELETE  /book-entities/:id} : delete the "id" bookEntity.
     *
     * @param id the id of the bookEntity to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/book-entities/{id}")
    public ResponseEntity<Void> deleteBookEntity(@PathVariable Long id) {
        log.debug("REST request to delete BookEntity : {}", id);
        bookEntityService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
