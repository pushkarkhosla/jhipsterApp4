/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterApp4TestModule } from '../../../test.module';
import { BookEntityComponent } from 'app/entities/book-entity/book-entity.component';
import { BookEntityService } from 'app/entities/book-entity/book-entity.service';
import { BookEntity } from 'app/shared/model/book-entity.model';

describe('Component Tests', () => {
  describe('BookEntity Management Component', () => {
    let comp: BookEntityComponent;
    let fixture: ComponentFixture<BookEntityComponent>;
    let service: BookEntityService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterApp4TestModule],
        declarations: [BookEntityComponent],
        providers: []
      })
        .overrideTemplate(BookEntityComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BookEntityComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BookEntityService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new BookEntity(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.bookEntities[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
