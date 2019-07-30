/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterApp4TestModule } from '../../../test.module';
import { PushkarJhipsterUpdateComponent } from 'app/entities/pushkar-jhipster/pushkar-jhipster-update.component';
import { PushkarJhipsterService } from 'app/entities/pushkar-jhipster/pushkar-jhipster.service';
import { PushkarJhipster } from 'app/shared/model/pushkar-jhipster.model';

describe('Component Tests', () => {
  describe('PushkarJhipster Management Update Component', () => {
    let comp: PushkarJhipsterUpdateComponent;
    let fixture: ComponentFixture<PushkarJhipsterUpdateComponent>;
    let service: PushkarJhipsterService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterApp4TestModule],
        declarations: [PushkarJhipsterUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PushkarJhipsterUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PushkarJhipsterUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PushkarJhipsterService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PushkarJhipster(123);
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
        const entity = new PushkarJhipster();
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
