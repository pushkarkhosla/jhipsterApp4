import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPushkarJhipster, PushkarJhipster } from 'app/shared/model/pushkar-jhipster.model';
import { PushkarJhipsterService } from './pushkar-jhipster.service';

@Component({
  selector: 'jhi-pushkar-jhipster-update',
  templateUrl: './pushkar-jhipster-update.component.html'
})
export class PushkarJhipsterUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [],
    addressLine1: [],
    addressLine2: [],
    addressLine3: [],
    pinCode: [],
    email: [],
    mobileNumber: []
  });

  constructor(
    protected pushkarJhipsterService: PushkarJhipsterService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ pushkarJhipster }) => {
      this.updateForm(pushkarJhipster);
    });
  }

  updateForm(pushkarJhipster: IPushkarJhipster) {
    this.editForm.patchValue({
      id: pushkarJhipster.id,
      name: pushkarJhipster.name,
      addressLine1: pushkarJhipster.addressLine1,
      addressLine2: pushkarJhipster.addressLine2,
      addressLine3: pushkarJhipster.addressLine3,
      pinCode: pushkarJhipster.pinCode,
      email: pushkarJhipster.email,
      mobileNumber: pushkarJhipster.mobileNumber
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const pushkarJhipster = this.createFromForm();
    if (pushkarJhipster.id !== undefined) {
      this.subscribeToSaveResponse(this.pushkarJhipsterService.update(pushkarJhipster));
    } else {
      this.subscribeToSaveResponse(this.pushkarJhipsterService.create(pushkarJhipster));
    }
  }

  private createFromForm(): IPushkarJhipster {
    return {
      ...new PushkarJhipster(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      addressLine1: this.editForm.get(['addressLine1']).value,
      addressLine2: this.editForm.get(['addressLine2']).value,
      addressLine3: this.editForm.get(['addressLine3']).value,
      pinCode: this.editForm.get(['pinCode']).value,
      email: this.editForm.get(['email']).value,
      mobileNumber: this.editForm.get(['mobileNumber']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPushkarJhipster>>) {
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
