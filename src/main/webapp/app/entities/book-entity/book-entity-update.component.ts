import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IBookEntity, BookEntity } from 'app/shared/model/book-entity.model';
import { BookEntityService } from './book-entity.service';

@Component({
  selector: 'jhi-book-entity-update',
  templateUrl: './book-entity-update.component.html'
})
export class BookEntityUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [],
    publisher: [],
    publishedDate: [],
    author: [],
    price: []
  });

  constructor(protected bookEntityService: BookEntityService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ bookEntity }) => {
      this.updateForm(bookEntity);
    });
  }

  updateForm(bookEntity: IBookEntity) {
    this.editForm.patchValue({
      id: bookEntity.id,
      name: bookEntity.name,
      publisher: bookEntity.publisher,
      publishedDate: bookEntity.publishedDate,
      author: bookEntity.author,
      price: bookEntity.price
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const bookEntity = this.createFromForm();
    if (bookEntity.id !== undefined) {
      this.subscribeToSaveResponse(this.bookEntityService.update(bookEntity));
    } else {
      this.subscribeToSaveResponse(this.bookEntityService.create(bookEntity));
    }
  }

  private createFromForm(): IBookEntity {
    return {
      ...new BookEntity(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      publisher: this.editForm.get(['publisher']).value,
      publishedDate: this.editForm.get(['publishedDate']).value,
      author: this.editForm.get(['author']).value,
      price: this.editForm.get(['price']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBookEntity>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
