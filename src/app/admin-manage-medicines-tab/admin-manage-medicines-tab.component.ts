import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Medicament } from '../models/medicament';
import { MedicamentRepositoryService } from '../services/medicament-repository.service';

@Component({
  selector: 'admin-manage-medicines-tab',
  templateUrl: './admin-manage-medicines-tab.component.html',
  styleUrls: ['./admin-manage-medicines-tab.component.css']
})
export class AdminManageMedicinesTabComponent {
  constructor(private medicamentRepository : MedicamentRepositoryService) { }

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

  ngOnInit() {
    this.medicamentRepository.getAll().subscribe(result => {
      this.medicines = result;
    })
  }
}
