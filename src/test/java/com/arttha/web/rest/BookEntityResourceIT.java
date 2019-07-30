package com.arttha.web.rest;

import com.arttha.JhipsterApp4App;
import com.arttha.domain.BookEntity;
import com.arttha.repository.BookEntityRepository;
import com.arttha.service.BookEntityService;
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
 * Integration tests for the {@Link BookEntityResource} REST controller.
 */
@SpringBootTest(classes = JhipsterApp4App.class)
public class BookEntityResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PUBLISHER = "AAAAAAAAAA";
    private static final String UPDATED_PUBLISHER = "BBBBBBBBBB";

    private static final String DEFAULT_PUBLISHED_DATE = "AAAAAAAAAA";
    private static final String UPDATED_PUBLISHED_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_AUTHOR = "AAAAAAAAAA";
    private static final String UPDATED_AUTHOR = "BBBBBBBBBB";

    private static final Integer DEFAULT_PRICE = 1;
    private static final Integer UPDATED_PRICE = 2;

    @Autowired
    private BookEntityRepository bookEntityRepository;

    @Autowired
    private BookEntityService bookEntityService;

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

    private MockMvc restBookEntityMockMvc;

    private BookEntity bookEntity;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BookEntityResource bookEntityResource = new BookEntityResource(bookEntityService);
        this.restBookEntityMockMvc = MockMvcBuilders.standaloneSetup(bookEntityResource)
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
    public static BookEntity createEntity(EntityManager em) {
        BookEntity bookEntity = new BookEntity()
            .name(DEFAULT_NAME)
            .publisher(DEFAULT_PUBLISHER)
            .publishedDate(DEFAULT_PUBLISHED_DATE)
            .author(DEFAULT_AUTHOR)
            .price(DEFAULT_PRICE);
        return bookEntity;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BookEntity createUpdatedEntity(EntityManager em) {
        BookEntity bookEntity = new BookEntity()
            .name(UPDATED_NAME)
            .publisher(UPDATED_PUBLISHER)
            .publishedDate(UPDATED_PUBLISHED_DATE)
            .author(UPDATED_AUTHOR)
            .price(UPDATED_PRICE);
        return bookEntity;
    }

    @BeforeEach
    public void initTest() {
        bookEntity = createEntity(em);
    }

    @Test
    @Transactional
    public void createBookEntity() throws Exception {
        int databaseSizeBeforeCreate = bookEntityRepository.findAll().size();

        // Create the BookEntity
        restBookEntityMockMvc.perform(post("/api/book-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bookEntity)))
            .andExpect(status().isCreated());

        // Validate the BookEntity in the database
        List<BookEntity> bookEntityList = bookEntityRepository.findAll();
        assertThat(bookEntityList).hasSize(databaseSizeBeforeCreate + 1);
        BookEntity testBookEntity = bookEntityList.get(bookEntityList.size() - 1);
        assertThat(testBookEntity.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testBookEntity.getPublisher()).isEqualTo(DEFAULT_PUBLISHER);
        assertThat(testBookEntity.getPublishedDate()).isEqualTo(DEFAULT_PUBLISHED_DATE);
        assertThat(testBookEntity.getAuthor()).isEqualTo(DEFAULT_AUTHOR);
        assertThat(testBookEntity.getPrice()).isEqualTo(DEFAULT_PRICE);
    }

    @Test
    @Transactional
    public void createBookEntityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bookEntityRepository.findAll().size();

        // Create the BookEntity with an existing ID
        bookEntity.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBookEntityMockMvc.perform(post("/api/book-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bookEntity)))
            .andExpect(status().isBadRequest());

        // Validate the BookEntity in the database
        List<BookEntity> bookEntityList = bookEntityRepository.findAll();
        assertThat(bookEntityList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllBookEntities() throws Exception {
        // Initialize the database
        bookEntityRepository.saveAndFlush(bookEntity);

        // Get all the bookEntityList
        restBookEntityMockMvc.perform(get("/api/book-entities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bookEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].publisher").value(hasItem(DEFAULT_PUBLISHER.toString())))
            .andExpect(jsonPath("$.[*].publishedDate").value(hasItem(DEFAULT_PUBLISHED_DATE.toString())))
            .andExpect(jsonPath("$.[*].author").value(hasItem(DEFAULT_AUTHOR.toString())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE)));
    }
    
    @Test
    @Transactional
    public void getBookEntity() throws Exception {
        // Initialize the database
        bookEntityRepository.saveAndFlush(bookEntity);

        // Get the bookEntity
        restBookEntityMockMvc.perform(get("/api/book-entities/{id}", bookEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bookEntity.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.publisher").value(DEFAULT_PUBLISHER.toString()))
            .andExpect(jsonPath("$.publishedDate").value(DEFAULT_PUBLISHED_DATE.toString()))
            .andExpect(jsonPath("$.author").value(DEFAULT_AUTHOR.toString()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE));
    }

    @Test
    @Transactional
    public void getNonExistingBookEntity() throws Exception {
        // Get the bookEntity
        restBookEntityMockMvc.perform(get("/api/book-entities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBookEntity() throws Exception {
        // Initialize the database
        bookEntityService.save(bookEntity);

        int databaseSizeBeforeUpdate = bookEntityRepository.findAll().size();

        // Update the bookEntity
        BookEntity updatedBookEntity = bookEntityRepository.findById(bookEntity.getId()).get();
        // Disconnect from session so that the updates on updatedBookEntity are not directly saved in db
        em.detach(updatedBookEntity);
        updatedBookEntity
            .name(UPDATED_NAME)
            .publisher(UPDATED_PUBLISHER)
            .publishedDate(UPDATED_PUBLISHED_DATE)
            .author(UPDATED_AUTHOR)
            .price(UPDATED_PRICE);

        restBookEntityMockMvc.perform(put("/api/book-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBookEntity)))
            .andExpect(status().isOk());

        // Validate the BookEntity in the database
        List<BookEntity> bookEntityList = bookEntityRepository.findAll();
        assertThat(bookEntityList).hasSize(databaseSizeBeforeUpdate);
        BookEntity testBookEntity = bookEntityList.get(bookEntityList.size() - 1);
        assertThat(testBookEntity.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testBookEntity.getPublisher()).isEqualTo(UPDATED_PUBLISHER);
        assertThat(testBookEntity.getPublishedDate()).isEqualTo(UPDATED_PUBLISHED_DATE);
        assertThat(testBookEntity.getAuthor()).isEqualTo(UPDATED_AUTHOR);
        assertThat(testBookEntity.getPrice()).isEqualTo(UPDATED_PRICE);
    }

    @Test
    @Transactional
    public void updateNonExistingBookEntity() throws Exception {
        int databaseSizeBeforeUpdate = bookEntityRepository.findAll().size();

        // Create the BookEntity

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBookEntityMockMvc.perform(put("/api/book-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bookEntity)))
            .andExpect(status().isBadRequest());

        // Validate the BookEntity in the database
        List<BookEntity> bookEntityList = bookEntityRepository.findAll();
        assertThat(bookEntityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBookEntity() throws Exception {
        // Initialize the database
        bookEntityService.save(bookEntity);

        int databaseSizeBeforeDelete = bookEntityRepository.findAll().size();

        // Delete the bookEntity
        restBookEntityMockMvc.perform(delete("/api/book-entities/{id}", bookEntity.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<BookEntity> bookEntityList = bookEntityRepository.findAll();
        assertThat(bookEntityList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(BookEntity.class);
        BookEntity bookEntity1 = new BookEntity();
        bookEntity1.setId(1L);
        BookEntity bookEntity2 = new BookEntity();
        bookEntity2.setId(bookEntity1.getId());
        assertThat(bookEntity1).isEqualTo(bookEntity2);
        bookEntity2.setId(2L);
        assertThat(bookEntity1).isNotEqualTo(bookEntity2);
        bookEntity1.setId(null);
        assertThat(bookEntity1).isNotEqualTo(bookEntity2);
    }
}
