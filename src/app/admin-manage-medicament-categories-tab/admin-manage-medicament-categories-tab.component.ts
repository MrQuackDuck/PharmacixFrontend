import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MedicamentCategory } from '../models/medicamentCategory';
import { MedicamentCategoryRepositoryService } from '../services/medicament-category-repository.service';
import { LoadingService } from '../services/loading.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'admin-manage-medicament-categories-tab',
  templateUrl: './admin-manage-medicament-categories-tab.component.html',
  styleUrls: ['./admin-manage-medicament-categories-tab.component.css']
})
export class AdminManageMedicamentCategoriesTabComponent {
  constructor(private medicamentCategoryRepository : MedicamentCategoryRepositoryService, private loadingService : LoadingService, private formBuilder : FormBuilder) { }

  @Output()
  onModalClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  @Output()
  onSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  @Output()
  onFail: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  createCategoryModalShown : boolean;

  editCategoryModalShown : boolean;
  deleteCategoryModalShown : boolean;

  newCategoryForm : FormGroup
  editCategoryForm : FormGroup

  medicamentCategories : MedicamentCategory[];

  // Used to store object that is maybe going
  // to be deleted (if user will confirm his choice in modal window)
  categoryToDelete : MedicamentCategory;

  category = null;

  ngOnInit() {
    this.newCategoryForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required)
    });
    
    this.editCategoryForm = this.formBuilder.group({
      id: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required)
    });

    this.updateData();
  }

  showEditModal(category : MedicamentCategory) {
    this.editCategoryForm = this.formBuilder.group({
      id: new FormControl(category.id, Validators.required),
      name: new FormControl(category.name, Validators.required)
    });

    this.editCategoryModalShown = true;
  }

  showDeleteModal(category : MedicamentCategory) {
    this.deleteCategoryModalShown = true;
    this.categoryToDelete = category;
  }

  submitNewCategory() {
    if (!this.newCategoryForm.valid) return;

    this.loadingService.enableLoading();
    this.closeAllModals();
    
    this.medicamentCategoryRepository.create(this.newCategoryForm.getRawValue()).subscribe(
      success => {
        this.updateData()
        this.onSuccess.emit();
        this.newCategoryForm.reset();
        this.newCategoryForm.markAsUntouched();
      },
      fail => {
        this.loadingService.disableLoading();
        this.onFail.emit();
      }
    )
  }

  submitEditedCategory() {
    if (!this.editCategoryForm.valid) return;

    this.loadingService.enableLoading();
    this.closeAllModals();
    
    this.medicamentCategoryRepository.edit(this.editCategoryForm.getRawValue()).subscribe(
      success => {
        this.updateData()
        this.onSuccess.emit();
        this.editCategoryForm.reset();
        this.editCategoryForm.markAsUntouched();
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
    
    this.medicamentCategoryRepository.delete(this.categoryToDelete.id).subscribe(
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
    this.editCategoryModalShown = false;
    this.deleteCategoryModalShown = false;
  }

  updateData() {
    this.loadingService.enableLoading();

    this.medicamentCategoryRepository.getAll().subscribe(result => {
      this.loadingService.disableLoading();
      this.medicamentCategories = result;
    })
  }
}
