package com.arttha.web.rest;

import com.arttha.domain.PushkarJhipster;
import com.arttha.service.PushkarJhipsterService;
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
 * REST controller for managing {@link com.arttha.domain.PushkarJhipster}.
 */
@RestController
@RequestMapping("/api")
public class PushkarJhipsterResource {

    private final Logger log = LoggerFactory.getLogger(PushkarJhipsterResource.class);

    private static final String ENTITY_NAME = "pushkarJhipster";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PushkarJhipsterService pushkarJhipsterService;

    public PushkarJhipsterResource(PushkarJhipsterService pushkarJhipsterService) {
        this.pushkarJhipsterService = pushkarJhipsterService;
    }

    /**
     * {@code POST  /pushkar-jhipsters} : Create a new pushkarJhipster.
     *
     * @param pushkarJhipster the pushkarJhipster to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pushkarJhipster, or with status {@code 400 (Bad Request)} if the pushkarJhipster has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pushkar-jhipsters")
    public ResponseEntity<PushkarJhipster> createPushkarJhipster(@RequestBody PushkarJhipster pushkarJhipster) throws URISyntaxException {
        log.debug("REST request to save PushkarJhipster : {}", pushkarJhipster);
        if (pushkarJhipster.getId() != null) {
            throw new BadRequestAlertException("A new pushkarJhipster cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PushkarJhipster result = pushkarJhipsterService.save(pushkarJhipster);
        return ResponseEntity.created(new URI("/api/pushkar-jhipsters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pushkar-jhipsters} : Updates an existing pushkarJhipster.
     *
     * @param pushkarJhipster the pushkarJhipster to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pushkarJhipster,
     * or with status {@code 400 (Bad Request)} if the pushkarJhipster is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pushkarJhipster couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pushkar-jhipsters")
    public ResponseEntity<PushkarJhipster> updatePushkarJhipster(@RequestBody PushkarJhipster pushkarJhipster) throws URISyntaxException {
        log.debug("REST request to update PushkarJhipster : {}", pushkarJhipster);
        if (pushkarJhipster.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PushkarJhipster result = pushkarJhipsterService.save(pushkarJhipster);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, pushkarJhipster.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /pushkar-jhipsters} : get all the pushkarJhipsters.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pushkarJhipsters in body.
     */
    @GetMapping("/pushkar-jhipsters")
    public List<PushkarJhipster> getAllPushkarJhipsters() {
        log.debug("REST request to get all PushkarJhipsters");
        return pushkarJhipsterService.findAll();
    }

    /**
     * {@code GET  /pushkar-jhipsters/:id} : get the "id" pushkarJhipster.
     *
     * @param id the id of the pushkarJhipster to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pushkarJhipster, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pushkar-jhipsters/{id}")
    public ResponseEntity<PushkarJhipster> getPushkarJhipster(@PathVariable Long id) {
        log.debug("REST request to get PushkarJhipster : {}", id);
        Optional<PushkarJhipster> pushkarJhipster = pushkarJhipsterService.findOne(id);
        return ResponseUtil.wrapOrNotFound(pushkarJhipster);
    }

    /**
     * {@code DELETE  /pushkar-jhipsters/:id} : delete the "id" pushkarJhipster.
     *
     * @param id the id of the pushkarJhipster to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pushkar-jhipsters/{id}")
    public ResponseEntity<Void> deletePushkarJhipster(@PathVariable Long id) {
        log.debug("REST request to delete PushkarJhipster : {}", id);
        pushkarJhipsterService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
