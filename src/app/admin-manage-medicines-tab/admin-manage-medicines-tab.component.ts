import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Medicament } from '../models/medicament';
import { MedicamentRepositoryService } from '../services/medicament-repository.service';
import { LoadingService } from '../services/loading.service';
import { MedicamentCategoryRepositoryService } from '../services/medicament-category-repository.service';
import { MedicamentCategory } from '../models/medicamentCategory';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'admin-manage-medicines-tab',
  templateUrl: './admin-manage-medicines-tab.component.html',
  styleUrls: ['./admin-manage-medicines-tab.component.css']
})
export class AdminManageMedicinesTabComponent {
  constructor(private medicamentRepository : MedicamentRepositoryService, private medicamentCategoryRepository : MedicamentCategoryRepositoryService, private loadingService : LoadingService, private formBuilder : FormBuilder) { }

  @Output()
  onModalClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  @Output()
  onSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  @Output()
  onFail: EventEmitter<boolean> = new EventEmitter<boolean>();

  closeNewMedicamentModal() {
    this.onModalClose.emit();
  }

  @Input()
  createMedicamentModalShown : boolean;

  editMedicamentModalShown : boolean;
  deleteMedicamentModalShown : boolean;

  newMedicamentForm : FormGroup

  medicines : Medicament[];
  medicamentCategories : MedicamentCategory[];

  category = null;

  ngOnInit() {
    this.newMedicamentForm = this.formBuilder.group({
      title: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
      categoryId: new FormControl(1, Validators.required),
    });

    this.updateData();
  }

  submitNewMedicament() {
    if (!this.newMedicamentForm.valid) return;

    this.loadingService.enableLoading();
    this.onModalClose.emit();
    
    this.medicamentRepository.create(this.newMedicamentForm.getRawValue()).subscribe(
      success => {
        this.updateData()
        this.onSuccess.emit();
        this.newMedicamentForm.reset();
        this.newMedicamentForm.markAsUntouched();
      },
      fail => {
        this.loadingService.disableLoading();
        this.onFail.emit();
      }
    )
  }

  updateData() {
    this.loadingService.enableLoading();

    this.medicamentCategoryRepository.getAll().subscribe(result => {
      this.medicamentCategories = result;
    })

    this.medicamentRepository.getAll().subscribe(result => {
      this.loadingService.disableLoading();
      this.medicines = result;
    })
  }
}
