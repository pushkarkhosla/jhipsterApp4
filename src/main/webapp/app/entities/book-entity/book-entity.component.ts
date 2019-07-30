import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBookEntity } from 'app/shared/model/book-entity.model';
import { AccountService } from 'app/core';
import { BookEntityService } from './book-entity.service';

@Component({
  selector: 'jhi-book-entity',
  templateUrl: './book-entity.component.html'
})
export class BookEntityComponent implements OnInit, OnDestroy {
  bookEntities: IBookEntity[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected bookEntityService: BookEntityService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.bookEntityService
      .query()
      .pipe(
        filter((res: HttpResponse<IBookEntity[]>) => res.ok),
        map((res: HttpResponse<IBookEntity[]>) => res.body)
      )
      .subscribe(
        (res: IBookEntity[]) => {
          this.bookEntities = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInBookEntities();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IBookEntity) {
    return item.id;
  }

  registerChangeInBookEntities() {
    this.eventSubscriber = this.eventManager.subscribe('bookEntityListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
