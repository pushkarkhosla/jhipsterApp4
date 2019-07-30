import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPushkarJhipster } from 'app/shared/model/pushkar-jhipster.model';
import { PushkarJhipsterService } from './pushkar-jhipster.service';

@Component({
  selector: 'jhi-pushkar-jhipster-delete-dialog',
  templateUrl: './pushkar-jhipster-delete-dialog.component.html'
})
export class PushkarJhipsterDeleteDialogComponent {
  pushkarJhipster: IPushkarJhipster;

  constructor(
    protected pushkarJhipsterService: PushkarJhipsterService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.pushkarJhipsterService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'pushkarJhipsterListModification',
        content: 'Deleted an pushkarJhipster'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-pushkar-jhipster-delete-popup',
  template: ''
})
export class PushkarJhipsterDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ pushkarJhipster }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PushkarJhipsterDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.pushkarJhipster = pushkarJhipster;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/pushkar-jhipster', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/pushkar-jhipster', { outlets: { popup: null } }]);
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
