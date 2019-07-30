import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPushkarJhipster } from 'app/shared/model/pushkar-jhipster.model';
import { AccountService } from 'app/core';
import { PushkarJhipsterService } from './pushkar-jhipster.service';

@Component({
  selector: 'jhi-pushkar-jhipster',
  templateUrl: './pushkar-jhipster.component.html'
})
export class PushkarJhipsterComponent implements OnInit, OnDestroy {
  pushkarJhipsters: IPushkarJhipster[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected pushkarJhipsterService: PushkarJhipsterService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.pushkarJhipsterService
      .query()
      .pipe(
        filter((res: HttpResponse<IPushkarJhipster[]>) => res.ok),
        map((res: HttpResponse<IPushkarJhipster[]>) => res.body)
      )
      .subscribe(
        (res: IPushkarJhipster[]) => {
          this.pushkarJhipsters = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPushkarJhipsters();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPushkarJhipster) {
    return item.id;
  }

  registerChangeInPushkarJhipsters() {
    this.eventSubscriber = this.eventManager.subscribe('pushkarJhipsterListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
