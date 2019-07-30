/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterApp4TestModule } from '../../../test.module';
import { BookEntityUpdateComponent } from 'app/entities/book-entity/book-entity-update.component';
import { BookEntityService } from 'app/entities/book-entity/book-entity.service';
import { BookEntity } from 'app/shared/model/book-entity.model';

describe('Component Tests', () => {
  describe('BookEntity Management Update Component', () => {
    let comp: BookEntityUpdateComponent;
    let fixture: ComponentFixture<BookEntityUpdateComponent>;
    let service: BookEntityService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterApp4TestModule],
        declarations: [BookEntityUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(BookEntityUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BookEntityUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BookEntityService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new BookEntity(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new BookEntity();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
