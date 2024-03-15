import { Component } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { MedicamentRepositoryService } from '../services/medicament-repository.service';
import { Medicament } from '../models/medicament';
import { TabType } from './tabType';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private loadingService : LoadingService, private medicamentRepository : MedicamentRepositoryService) { }

  public activeTab : TabType;

  TabType = TabType;

  medicines : Medicament[];

  createNewMedicamentModalShown : boolean;
  createNewMedicamentCategoryModalShown : boolean;
  createNewUserModalShown : boolean;

  ngOnInit() {
    this.activeTab = TabType.Medicines;
    this.loadingService.disableLoading();
  }

  setTab(tab : TabType) {
    this.activeTab = tab;
  }

  openNewModal() {
    switch (this.activeTab) {
      case TabType.Medicines:
        this.openNewMedicamentModal();
        break;
      case TabType.MedicamentCategories:
        this.openNewMedicamentCategoryModal();
        break;
      case TabType.Users:
        this.openNewUserModal();
        break;
      default:
        break;
    }
  }

  openNewMedicamentModal() {
    this.createNewMedicamentModalShown = true;
  }

  openNewMedicamentCategoryModal() {
    this.createNewMedicamentCategoryModalShown = true;
  }

  openNewUserModal() {
    this.createNewUserModalShown = true;
  }

  closeAllModals() {
    this.createNewMedicamentModalShown = false;
    this.createNewMedicamentCategoryModalShown = false;
    this.createNewUserModalShown = false;
  }
}
