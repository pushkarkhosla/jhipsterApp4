import { NgModule } from '@angular/core';

import { JhipsterApp4SharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [JhipsterApp4SharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [JhipsterApp4SharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class JhipsterApp4SharedCommonModule {}
