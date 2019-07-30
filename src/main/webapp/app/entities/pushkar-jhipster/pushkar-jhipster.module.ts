import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterApp4SharedModule } from 'app/shared';
import {
  PushkarJhipsterComponent,
  PushkarJhipsterDetailComponent,
  PushkarJhipsterUpdateComponent,
  PushkarJhipsterDeletePopupComponent,
  PushkarJhipsterDeleteDialogComponent,
  pushkarJhipsterRoute,
  pushkarJhipsterPopupRoute
} from './';

const ENTITY_STATES = [...pushkarJhipsterRoute, ...pushkarJhipsterPopupRoute];

@NgModule({
  imports: [JhipsterApp4SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PushkarJhipsterComponent,
    PushkarJhipsterDetailComponent,
    PushkarJhipsterUpdateComponent,
    PushkarJhipsterDeleteDialogComponent,
    PushkarJhipsterDeletePopupComponent
  ],
  entryComponents: [
    PushkarJhipsterComponent,
    PushkarJhipsterUpdateComponent,
    PushkarJhipsterDeleteDialogComponent,
    PushkarJhipsterDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterApp4PushkarJhipsterModule {}
