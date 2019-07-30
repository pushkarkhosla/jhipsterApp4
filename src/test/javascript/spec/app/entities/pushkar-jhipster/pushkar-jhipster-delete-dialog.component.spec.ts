/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterApp4TestModule } from '../../../test.module';
import { PushkarJhipsterDeleteDialogComponent } from 'app/entities/pushkar-jhipster/pushkar-jhipster-delete-dialog.component';
import { PushkarJhipsterService } from 'app/entities/pushkar-jhipster/pushkar-jhipster.service';

describe('Component Tests', () => {
  describe('PushkarJhipster Management Delete Component', () => {
    let comp: PushkarJhipsterDeleteDialogComponent;
    let fixture: ComponentFixture<PushkarJhipsterDeleteDialogComponent>;
    let service: PushkarJhipsterService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterApp4TestModule],
        declarations: [PushkarJhipsterDeleteDialogComponent]
      })
        .overrideTemplate(PushkarJhipsterDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PushkarJhipsterDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PushkarJhipsterService);
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
