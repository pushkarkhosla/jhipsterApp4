import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPushkarJhipster } from 'app/shared/model/pushkar-jhipster.model';

@Component({
  selector: 'jhi-pushkar-jhipster-detail',
  templateUrl: './pushkar-jhipster-detail.component.html'
})
export class PushkarJhipsterDetailComponent implements OnInit {
  pushkarJhipster: IPushkarJhipster;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ pushkarJhipster }) => {
      this.pushkarJhipster = pushkarJhipster;
    });
  }

  previousState() {
    window.history.back();
  }
}
