/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { PushkarJhipsterService } from 'app/entities/pushkar-jhipster/pushkar-jhipster.service';
import { IPushkarJhipster, PushkarJhipster } from 'app/shared/model/pushkar-jhipster.model';

describe('Service Tests', () => {
  describe('PushkarJhipster Service', () => {
    let injector: TestBed;
    let service: PushkarJhipsterService;
    let httpMock: HttpTestingController;
    let elemDefault: IPushkarJhipster;
    let expectedResult;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(PushkarJhipsterService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new PushkarJhipster(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 0, 'AAAAAAA', 0);
    });

    describe('Service methods', () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign({}, elemDefault);
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a PushkarJhipster', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .create(new PushkarJhipster(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a PushkarJhipster', async () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            addressLine1: 'BBBBBB',
            addressLine2: 'BBBBBB',
            addressLine3: 'BBBBBB',
            pinCode: 1,
            email: 'BBBBBB',
            mobileNumber: 1
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of PushkarJhipster', async () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            addressLine1: 'BBBBBB',
            addressLine2: 'BBBBBB',
            addressLine3: 'BBBBBB',
            pinCode: 1,
            email: 'BBBBBB',
            mobileNumber: 1
          },
          elemDefault
        );
        const expected = Object.assign({}, returnedFromService);
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a PushkarJhipster', async () => {
        const rxPromise = service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
