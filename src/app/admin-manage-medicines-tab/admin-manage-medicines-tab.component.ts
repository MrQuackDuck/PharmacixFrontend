import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Medicament } from '../models/medicament';
import { MedicamentRepositoryService } from '../services/medicament-repository.service';
import { LoadingService } from '../services/loading.service';
import { MedicamentCategoryRepositoryService } from '../services/medicament-category-repository.service';
import { MedicamentCategory } from '../models/medicamentCategory';

@Component({
  selector: 'admin-manage-medicines-tab',
  templateUrl: './admin-manage-medicines-tab.component.html',
  styleUrls: ['./admin-manage-medicines-tab.component.css']
})
export class AdminManageMedicinesTabComponent {
  constructor(private medicamentRepository : MedicamentRepositoryService, private medicamentCategoryRepository : MedicamentCategoryRepositoryService, private loadingService : LoadingService) { }

  @Output()
  onModalClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  closeNewMedicamentModal() {
    this.onModalClose.emit();
  }

  @Input()
  createMedicamentModalShown : boolean;

  editMedicamentModalShown : boolean;
  deleteMedicamentModalShown : boolean;

  medicines : Medicament[];
  medicamentCategories : MedicamentCategory[];

  ngOnInit() {
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
