package com.arttha.web.rest;

import com.arttha.JhipsterApp4App;
import com.arttha.domain.PushkarJhipster;
import com.arttha.repository.PushkarJhipsterRepository;
import com.arttha.service.PushkarJhipsterService;
import com.arttha.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.arttha.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link PushkarJhipsterResource} REST controller.
 */
@SpringBootTest(classes = JhipsterApp4App.class)
public class PushkarJhipsterResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS_LINE_1 = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_LINE_1 = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS_LINE_2 = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_LINE_2 = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS_LINE_3 = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_LINE_3 = "BBBBBBBBBB";

    private static final Integer DEFAULT_PIN_CODE = 1;
    private static final Integer UPDATED_PIN_CODE = 2;

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final Integer DEFAULT_MOBILE_NUMBER = 1;
    private static final Integer UPDATED_MOBILE_NUMBER = 2;

    @Autowired
    private PushkarJhipsterRepository pushkarJhipsterRepository;

    @Autowired
    private PushkarJhipsterService pushkarJhipsterService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restPushkarJhipsterMockMvc;

    private PushkarJhipster pushkarJhipster;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PushkarJhipsterResource pushkarJhipsterResource = new PushkarJhipsterResource(pushkarJhipsterService);
        this.restPushkarJhipsterMockMvc = MockMvcBuilders.standaloneSetup(pushkarJhipsterResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PushkarJhipster createEntity(EntityManager em) {
        PushkarJhipster pushkarJhipster = new PushkarJhipster()
            .name(DEFAULT_NAME)
            .addressLine1(DEFAULT_ADDRESS_LINE_1)
            .addressLine2(DEFAULT_ADDRESS_LINE_2)
            .addressLine3(DEFAULT_ADDRESS_LINE_3)
            .pinCode(DEFAULT_PIN_CODE)
            .email(DEFAULT_EMAIL)
            .mobileNumber(DEFAULT_MOBILE_NUMBER);
        return pushkarJhipster;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PushkarJhipster createUpdatedEntity(EntityManager em) {
        PushkarJhipster pushkarJhipster = new PushkarJhipster()
            .name(UPDATED_NAME)
            .addressLine1(UPDATED_ADDRESS_LINE_1)
            .addressLine2(UPDATED_ADDRESS_LINE_2)
            .addressLine3(UPDATED_ADDRESS_LINE_3)
            .pinCode(UPDATED_PIN_CODE)
            .email(UPDATED_EMAIL)
            .mobileNumber(UPDATED_MOBILE_NUMBER);
        return pushkarJhipster;
    }

    @BeforeEach
    public void initTest() {
        pushkarJhipster = createEntity(em);
    }

    @Test
    @Transactional
    public void createPushkarJhipster() throws Exception {
        int databaseSizeBeforeCreate = pushkarJhipsterRepository.findAll().size();

        // Create the PushkarJhipster
        restPushkarJhipsterMockMvc.perform(post("/api/pushkar-jhipsters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pushkarJhipster)))
            .andExpect(status().isCreated());

        // Validate the PushkarJhipster in the database
        List<PushkarJhipster> pushkarJhipsterList = pushkarJhipsterRepository.findAll();
        assertThat(pushkarJhipsterList).hasSize(databaseSizeBeforeCreate + 1);
        PushkarJhipster testPushkarJhipster = pushkarJhipsterList.get(pushkarJhipsterList.size() - 1);
        assertThat(testPushkarJhipster.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPushkarJhipster.getAddressLine1()).isEqualTo(DEFAULT_ADDRESS_LINE_1);
        assertThat(testPushkarJhipster.getAddressLine2()).isEqualTo(DEFAULT_ADDRESS_LINE_2);
        assertThat(testPushkarJhipster.getAddressLine3()).isEqualTo(DEFAULT_ADDRESS_LINE_3);
        assertThat(testPushkarJhipster.getPinCode()).isEqualTo(DEFAULT_PIN_CODE);
        assertThat(testPushkarJhipster.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testPushkarJhipster.getMobileNumber()).isEqualTo(DEFAULT_MOBILE_NUMBER);
    }

    @Test
    @Transactional
    public void createPushkarJhipsterWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pushkarJhipsterRepository.findAll().size();

        // Create the PushkarJhipster with an existing ID
        pushkarJhipster.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPushkarJhipsterMockMvc.perform(post("/api/pushkar-jhipsters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pushkarJhipster)))
            .andExpect(status().isBadRequest());

        // Validate the PushkarJhipster in the database
        List<PushkarJhipster> pushkarJhipsterList = pushkarJhipsterRepository.findAll();
        assertThat(pushkarJhipsterList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPushkarJhipsters() throws Exception {
        // Initialize the database
        pushkarJhipsterRepository.saveAndFlush(pushkarJhipster);

        // Get all the pushkarJhipsterList
        restPushkarJhipsterMockMvc.perform(get("/api/pushkar-jhipsters?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pushkarJhipster.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].addressLine1").value(hasItem(DEFAULT_ADDRESS_LINE_1.toString())))
            .andExpect(jsonPath("$.[*].addressLine2").value(hasItem(DEFAULT_ADDRESS_LINE_2.toString())))
            .andExpect(jsonPath("$.[*].addressLine3").value(hasItem(DEFAULT_ADDRESS_LINE_3.toString())))
            .andExpect(jsonPath("$.[*].pinCode").value(hasItem(DEFAULT_PIN_CODE)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].mobileNumber").value(hasItem(DEFAULT_MOBILE_NUMBER)));
    }
    
    @Test
    @Transactional
    public void getPushkarJhipster() throws Exception {
        // Initialize the database
        pushkarJhipsterRepository.saveAndFlush(pushkarJhipster);

        // Get the pushkarJhipster
        restPushkarJhipsterMockMvc.perform(get("/api/pushkar-jhipsters/{id}", pushkarJhipster.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pushkarJhipster.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.addressLine1").value(DEFAULT_ADDRESS_LINE_1.toString()))
            .andExpect(jsonPath("$.addressLine2").value(DEFAULT_ADDRESS_LINE_2.toString()))
            .andExpect(jsonPath("$.addressLine3").value(DEFAULT_ADDRESS_LINE_3.toString()))
            .andExpect(jsonPath("$.pinCode").value(DEFAULT_PIN_CODE))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.mobileNumber").value(DEFAULT_MOBILE_NUMBER));
    }

    @Test
    @Transactional
    public void getNonExistingPushkarJhipster() throws Exception {
        // Get the pushkarJhipster
        restPushkarJhipsterMockMvc.perform(get("/api/pushkar-jhipsters/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePushkarJhipster() throws Exception {
        // Initialize the database
        pushkarJhipsterService.save(pushkarJhipster);

        int databaseSizeBeforeUpdate = pushkarJhipsterRepository.findAll().size();

        // Update the pushkarJhipster
        PushkarJhipster updatedPushkarJhipster = pushkarJhipsterRepository.findById(pushkarJhipster.getId()).get();
        // Disconnect from session so that the updates on updatedPushkarJhipster are not directly saved in db
        em.detach(updatedPushkarJhipster);
        updatedPushkarJhipster
            .name(UPDATED_NAME)
            .addressLine1(UPDATED_ADDRESS_LINE_1)
            .addressLine2(UPDATED_ADDRESS_LINE_2)
            .addressLine3(UPDATED_ADDRESS_LINE_3)
            .pinCode(UPDATED_PIN_CODE)
            .email(UPDATED_EMAIL)
            .mobileNumber(UPDATED_MOBILE_NUMBER);

        restPushkarJhipsterMockMvc.perform(put("/api/pushkar-jhipsters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPushkarJhipster)))
            .andExpect(status().isOk());

        // Validate the PushkarJhipster in the database
        List<PushkarJhipster> pushkarJhipsterList = pushkarJhipsterRepository.findAll();
        assertThat(pushkarJhipsterList).hasSize(databaseSizeBeforeUpdate);
        PushkarJhipster testPushkarJhipster = pushkarJhipsterList.get(pushkarJhipsterList.size() - 1);
        assertThat(testPushkarJhipster.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPushkarJhipster.getAddressLine1()).isEqualTo(UPDATED_ADDRESS_LINE_1);
        assertThat(testPushkarJhipster.getAddressLine2()).isEqualTo(UPDATED_ADDRESS_LINE_2);
        assertThat(testPushkarJhipster.getAddressLine3()).isEqualTo(UPDATED_ADDRESS_LINE_3);
        assertThat(testPushkarJhipster.getPinCode()).isEqualTo(UPDATED_PIN_CODE);
        assertThat(testPushkarJhipster.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testPushkarJhipster.getMobileNumber()).isEqualTo(UPDATED_MOBILE_NUMBER);
    }

    @Test
    @Transactional
    public void updateNonExistingPushkarJhipster() throws Exception {
        int databaseSizeBeforeUpdate = pushkarJhipsterRepository.findAll().size();

        // Create the PushkarJhipster

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPushkarJhipsterMockMvc.perform(put("/api/pushkar-jhipsters")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pushkarJhipster)))
            .andExpect(status().isBadRequest());

        // Validate the PushkarJhipster in the database
        List<PushkarJhipster> pushkarJhipsterList = pushkarJhipsterRepository.findAll();
        assertThat(pushkarJhipsterList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePushkarJhipster() throws Exception {
        // Initialize the database
        pushkarJhipsterService.save(pushkarJhipster);

        int databaseSizeBeforeDelete = pushkarJhipsterRepository.findAll().size();

        // Delete the pushkarJhipster
        restPushkarJhipsterMockMvc.perform(delete("/api/pushkar-jhipsters/{id}", pushkarJhipster.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PushkarJhipster> pushkarJhipsterList = pushkarJhipsterRepository.findAll();
        assertThat(pushkarJhipsterList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PushkarJhipster.class);
        PushkarJhipster pushkarJhipster1 = new PushkarJhipster();
        pushkarJhipster1.setId(1L);
        PushkarJhipster pushkarJhipster2 = new PushkarJhipster();
        pushkarJhipster2.setId(pushkarJhipster1.getId());
        assertThat(pushkarJhipster1).isEqualTo(pushkarJhipster2);
        pushkarJhipster2.setId(2L);
        assertThat(pushkarJhipster1).isNotEqualTo(pushkarJhipster2);
        pushkarJhipster1.setId(null);
        assertThat(pushkarJhipster1).isNotEqualTo(pushkarJhipster2);
    }
}
