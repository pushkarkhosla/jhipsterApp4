/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterApp4TestModule } from '../../../test.module';
import { PushkarJhipsterDetailComponent } from 'app/entities/pushkar-jhipster/pushkar-jhipster-detail.component';
import { PushkarJhipster } from 'app/shared/model/pushkar-jhipster.model';

describe('Component Tests', () => {
  describe('PushkarJhipster Management Detail Component', () => {
    let comp: PushkarJhipsterDetailComponent;
    let fixture: ComponentFixture<PushkarJhipsterDetailComponent>;
    const route = ({ data: of({ pushkarJhipster: new PushkarJhipster(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterApp4TestModule],
        declarations: [PushkarJhipsterDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PushkarJhipsterDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PushkarJhipsterDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.pushkarJhipster).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
