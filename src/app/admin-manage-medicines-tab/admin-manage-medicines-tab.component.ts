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

  @Input()
  createMedicamentModalShown : boolean;

  editMedicamentModalShown : boolean;
  deleteMedicamentModalShown : boolean;

  newMedicamentForm : FormGroup
  editMedicamentForm : FormGroup

  medicines : Medicament[];
  medicamentCategories : MedicamentCategory[];

  // Used to store object that is maybe going
  // to be deleted (if user will confirm his choice in modal window)
  medicamentToDelete : Medicament;

  category = null;

  ngOnInit() {
    this.updateData();
    
    this.editMedicamentForm = this.formBuilder.group({
      title: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
      categoryId: new FormControl(1, Validators.required),
    });
  }

  showEditModal(medicament : Medicament) {
    this.editMedicamentForm = this.formBuilder.group({
      id: new FormControl(medicament.id, Validators.required),
      title: new FormControl(medicament.title, Validators.required),
      price: new FormControl(medicament.price, Validators.required),
      amount: new FormControl(medicament.amount, Validators.required),
      categoryId: new FormControl(medicament.category.id, Validators.required),
    });

    this.editMedicamentModalShown = true;
  }

  showDeleteModal(medicament : Medicament) {
    this.deleteMedicamentModalShown = true;
    this.medicamentToDelete = medicament;
  }

  submitNewMedicament() {
    if (!this.newMedicamentForm.valid) return;

    this.loadingService.enableLoading();
    this.closeAllModals();
    
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

  submitEditedMedicament() {
    if (!this.editMedicamentForm.valid) return;

    this.loadingService.enableLoading();
    this.closeAllModals();
    
    this.medicamentRepository.edit(this.editMedicamentForm.getRawValue()).subscribe(
      success => {
        this.updateData()
        this.onSuccess.emit();
        this.editMedicamentForm.reset();
        this.editMedicamentForm.markAsUntouched();
      },
      fail => {
        this.loadingService.disableLoading();
        this.onFail.emit();
      }
    )
  }

  confirmDelete() {
    this.loadingService.enableLoading();
    this.closeAllModals();
    
    this.medicamentRepository.delete(this.medicamentToDelete.id).subscribe(
      success => {
        this.updateData()
        this.onSuccess.emit();
      },
      fail => {
        this.loadingService.disableLoading();
        this.onFail.emit();
      }
    )
  }

  closeAllModals() {
    this.onModalClose.emit();
    this.editMedicamentModalShown = false;
    this.deleteMedicamentModalShown = false;
  }

  updateData() {
    this.loadingService.enableLoading();

    this.medicamentCategoryRepository.getAll().subscribe(result => {
      this.medicamentCategories = result;

      this.newMedicamentForm = this.formBuilder.group({
        title: new FormControl(null, Validators.required),
        price: new FormControl(null, Validators.required),
        amount: new FormControl(null, Validators.required),
        categoryId: new FormControl(this.medicamentCategories.length == 0 ? 0 : this.medicamentCategories[0].id, Validators.required),
      });
    })

    this.medicamentRepository.getAll().subscribe(result => {
      this.loadingService.disableLoading();
      this.medicines = result;
    })
  }
}
