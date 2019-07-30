/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterApp4TestModule } from '../../../test.module';
import { BookEntityDeleteDialogComponent } from 'app/entities/book-entity/book-entity-delete-dialog.component';
import { BookEntityService } from 'app/entities/book-entity/book-entity.service';

describe('Component Tests', () => {
  describe('BookEntity Management Delete Component', () => {
    let comp: BookEntityDeleteDialogComponent;
    let fixture: ComponentFixture<BookEntityDeleteDialogComponent>;
    let service: BookEntityService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterApp4TestModule],
        declarations: [BookEntityDeleteDialogComponent]
      })
        .overrideTemplate(BookEntityDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BookEntityDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BookEntityService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
