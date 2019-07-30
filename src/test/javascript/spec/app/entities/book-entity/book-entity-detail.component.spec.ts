/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterApp4TestModule } from '../../../test.module';
import { BookEntityDetailComponent } from 'app/entities/book-entity/book-entity-detail.component';
import { BookEntity } from 'app/shared/model/book-entity.model';

describe('Component Tests', () => {
  describe('BookEntity Management Detail Component', () => {
    let comp: BookEntityDetailComponent;
    let fixture: ComponentFixture<BookEntityDetailComponent>;
    const route = ({ data: of({ bookEntity: new BookEntity(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterApp4TestModule],
        declarations: [BookEntityDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(BookEntityDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BookEntityDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.bookEntity).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
