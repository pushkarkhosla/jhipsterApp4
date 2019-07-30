import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IBookEntity } from 'app/shared/model/book-entity.model';

type EntityResponseType = HttpResponse<IBookEntity>;
type EntityArrayResponseType = HttpResponse<IBookEntity[]>;

@Injectable({ providedIn: 'root' })
export class BookEntityService {
  public resourceUrl = SERVER_API_URL + 'api/book-entities';

  constructor(protected http: HttpClient) {}

  create(bookEntity: IBookEntity): Observable<EntityResponseType> {
    return this.http.post<IBookEntity>(this.resourceUrl, bookEntity, { observe: 'response' });
  }

  update(bookEntity: IBookEntity): Observable<EntityResponseType> {
    return this.http.put<IBookEntity>(this.resourceUrl, bookEntity, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBookEntity>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBookEntity[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
