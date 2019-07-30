/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterApp4TestModule } from '../../../test.module';
import { PushkarJhipsterComponent } from 'app/entities/pushkar-jhipster/pushkar-jhipster.component';
import { PushkarJhipsterService } from 'app/entities/pushkar-jhipster/pushkar-jhipster.service';
import { PushkarJhipster } from 'app/shared/model/pushkar-jhipster.model';

describe('Component Tests', () => {
  describe('PushkarJhipster Management Component', () => {
    let comp: PushkarJhipsterComponent;
    let fixture: ComponentFixture<PushkarJhipsterComponent>;
    let service: PushkarJhipsterService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterApp4TestModule],
        declarations: [PushkarJhipsterComponent],
        providers: []
      })
        .overrideTemplate(PushkarJhipsterComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PushkarJhipsterComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PushkarJhipsterService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PushkarJhipster(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.pushkarJhipsters[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
