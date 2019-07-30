import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBookEntity } from 'app/shared/model/book-entity.model';
import { BookEntityService } from './book-entity.service';

@Component({
  selector: 'jhi-book-entity-delete-dialog',
  templateUrl: './book-entity-delete-dialog.component.html'
})
export class BookEntityDeleteDialogComponent {
  bookEntity: IBookEntity;

  constructor(
    protected bookEntityService: BookEntityService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.bookEntityService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'bookEntityListModification',
        content: 'Deleted an bookEntity'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-book-entity-delete-popup',
  template: ''
})
export class BookEntityDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ bookEntity }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(BookEntityDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.bookEntity = bookEntity;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/book-entity', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/book-entity', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
