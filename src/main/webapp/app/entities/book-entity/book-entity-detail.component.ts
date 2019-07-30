import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBookEntity } from 'app/shared/model/book-entity.model';

@Component({
  selector: 'jhi-book-entity-detail',
  templateUrl: './book-entity-detail.component.html'
})
export class BookEntityDetailComponent implements OnInit {
  bookEntity: IBookEntity;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ bookEntity }) => {
      this.bookEntity = bookEntity;
    });
  }

  previousState() {
    window.history.back();
  }
}
