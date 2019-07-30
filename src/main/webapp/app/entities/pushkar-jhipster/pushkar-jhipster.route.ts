import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PushkarJhipster } from 'app/shared/model/pushkar-jhipster.model';
import { PushkarJhipsterService } from './pushkar-jhipster.service';
import { PushkarJhipsterComponent } from './pushkar-jhipster.component';
import { PushkarJhipsterDetailComponent } from './pushkar-jhipster-detail.component';
import { PushkarJhipsterUpdateComponent } from './pushkar-jhipster-update.component';
import { PushkarJhipsterDeletePopupComponent } from './pushkar-jhipster-delete-dialog.component';
import { IPushkarJhipster } from 'app/shared/model/pushkar-jhipster.model';

@Injectable({ providedIn: 'root' })
export class PushkarJhipsterResolve implements Resolve<IPushkarJhipster> {
  constructor(private service: PushkarJhipsterService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPushkarJhipster> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PushkarJhipster>) => response.ok),
        map((pushkarJhipster: HttpResponse<PushkarJhipster>) => pushkarJhipster.body)
      );
    }
    return of(new PushkarJhipster());
  }
}

export const pushkarJhipsterRoute: Routes = [
  {
    path: '',
    component: PushkarJhipsterComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PushkarJhipsters'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PushkarJhipsterDetailComponent,
    resolve: {
      pushkarJhipster: PushkarJhipsterResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PushkarJhipsters'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PushkarJhipsterUpdateComponent,
    resolve: {
      pushkarJhipster: PushkarJhipsterResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PushkarJhipsters'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PushkarJhipsterUpdateComponent,
    resolve: {
      pushkarJhipster: PushkarJhipsterResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PushkarJhipsters'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const pushkarJhipsterPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PushkarJhipsterDeletePopupComponent,
    resolve: {
      pushkarJhipster: PushkarJhipsterResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'PushkarJhipsters'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
