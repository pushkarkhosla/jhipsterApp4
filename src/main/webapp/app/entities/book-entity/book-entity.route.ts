import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BookEntity } from 'app/shared/model/book-entity.model';
import { BookEntityService } from './book-entity.service';
import { BookEntityComponent } from './book-entity.component';
import { BookEntityDetailComponent } from './book-entity-detail.component';
import { BookEntityUpdateComponent } from './book-entity-update.component';
import { BookEntityDeletePopupComponent } from './book-entity-delete-dialog.component';
import { IBookEntity } from 'app/shared/model/book-entity.model';

@Injectable({ providedIn: 'root' })
export class BookEntityResolve implements Resolve<IBookEntity> {
  constructor(private service: BookEntityService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBookEntity> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<BookEntity>) => response.ok),
        map((bookEntity: HttpResponse<BookEntity>) => bookEntity.body)
      );
    }
    return of(new BookEntity());
  }
}

export const bookEntityRoute: Routes = [
  {
    path: '',
    component: BookEntityComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'BookEntities'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BookEntityDetailComponent,
    resolve: {
      bookEntity: BookEntityResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'BookEntities'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BookEntityUpdateComponent,
    resolve: {
      bookEntity: BookEntityResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'BookEntities'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BookEntityUpdateComponent,
    resolve: {
      bookEntity: BookEntityResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'BookEntities'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const bookEntityPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: BookEntityDeletePopupComponent,
    resolve: {
      bookEntity: BookEntityResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'BookEntities'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
