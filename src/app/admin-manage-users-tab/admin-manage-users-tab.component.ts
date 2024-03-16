import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../models/user';
import { UserRepositoryService } from '../services/user-repository.service';
import { LoadingService } from '../services/loading.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DeleteUserModel } from '../models/requestModels/deleteUser';

@Component({
  selector: 'admin-manage-users-tab',
  templateUrl: './admin-manage-users-tab.component.html',
  styleUrls: ['./admin-manage-users-tab.component.css']
})
export class AdminManageUsersTabComponent {
  constructor(private userRepository : UserRepositoryService, private loadingService : LoadingService, private formBuilder : FormBuilder) { }

  @Output()
  onModalClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  @Output()
  onSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  @Output()
  onFail: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  createUserModalShown : boolean;
  deleteUserModalShown : boolean;

  newUserForm : FormGroup

  users : User[]

  // Used to store object that is maybe going
  // to be deleted (if user will confirm his choice in modal window)
  userToDelete : User;

  ngOnInit() {
    this.updateData();
    
    this.newUserForm = this.formBuilder.group({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  showDeleteModal(user : User) {
    this.deleteUserModalShown = true;
    this.userToDelete = user;
  }

  submitNewUser() {
    if (!this.newUserForm.valid) return;

    this.loadingService.enableLoading();
    this.closeAllModals();
    
    this.userRepository.create(this.newUserForm.getRawValue()).subscribe(
      success => {
        this.updateData()
        this.onSuccess.emit();
        this.newUserForm.reset();
        this.newUserForm.markAsUntouched();
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

    let model = new DeleteUserModel();
    model.id = this.userToDelete.id;
    
    this.userRepository.delete(model).subscribe(
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
    this.deleteUserModalShown = false;
  }

  updateData() {
    this.loadingService.enableLoading();

    this.userRepository.getAll().subscribe(result => {
      this.loadingService.disableLoading();
      this.users = result;
    })
  }
}
