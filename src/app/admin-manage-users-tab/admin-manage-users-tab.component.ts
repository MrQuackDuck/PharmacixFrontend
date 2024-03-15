import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../models/user';
import { UserRepositoryService } from '../services/user-repository.service';

@Component({
  selector: 'admin-manage-users-tab',
  templateUrl: './admin-manage-users-tab.component.html',
  styleUrls: ['./admin-manage-users-tab.component.css']
})
export class AdminManageUsersTabComponent {
  constructor(private userRepository : UserRepositoryService) { }

  users : User[];

  @Output()
  onModalClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  closeNewUserModal() {
    this.onModalClose.emit();
  }

  @Input()
  createUserModalShown : boolean;

  editMedicamentModalShown : boolean;
  deleteMedicamentModalShown : boolean;

  ngOnInit() {
    this.userRepository.getAll().subscribe(result => {
      this.users = result;
    })
  }
}
