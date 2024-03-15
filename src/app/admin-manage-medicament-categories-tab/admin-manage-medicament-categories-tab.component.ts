import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MedicamentCategory } from '../models/medicamentCategory';
import { MedicamentCategoryRepositoryService } from '../services/medicament-category-repository.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'admin-manage-medicament-categories-tab',
  templateUrl: './admin-manage-medicament-categories-tab.component.html',
  styleUrls: ['./admin-manage-medicament-categories-tab.component.css']
})
export class AdminManageMedicamentCategoriesTabComponent {
  constructor(private medicamentCategoryRepository : MedicamentCategoryRepositoryService, private loadingService : LoadingService) { }

  @Output()
  onModalClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  closeNewCategoryModal() {
    this.onModalClose.emit();
  }

  @Input()
  createCategoryModalShown : boolean;

  editMedicamentModalShown : boolean;
  deleteMedicamentModalShown : boolean;

  medicamentCategories : MedicamentCategory[];

  ngOnInit() {
    this.loadingService.enableLoading();

    this.medicamentCategoryRepository.getAll().subscribe(result => {
      this.loadingService.disableLoading();
      this.medicamentCategories = result;
    })
  }
}
