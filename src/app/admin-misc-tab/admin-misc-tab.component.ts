import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'admin-misc-tab',
  templateUrl: './admin-misc-tab.component.html',
  styleUrls: ['./admin-misc-tab.component.css']
})
export class AdminMiscTabComponent {
  constructor(private authService : AuthService, private router : Router, private loadingService : LoadingService,
    private formBuilder : FormBuilder) { }
  
  changePasswordForm : FormGroup;

  @Output()
  onFail: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: new FormControl(null, Validators.required),
      newPassword: new FormControl(null, Validators.required),
      newPasswordConfirm: new FormControl(null, Validators.required)
    })

    this.loadingService.disableLoading();
  }

  changePasswordModalShown : boolean;

  showChangePasswordModal() {
    this.changePasswordModalShown = true;
  }

  changePassword() {
    let oldPassword = this.changePasswordForm.controls['oldPassword'].getRawValue();
    let newPassword = this.changePasswordForm.controls['newPassword'].getRawValue();
    let newPasswordConfirm = this.changePasswordForm.controls['newPasswordConfirm'].getRawValue();

    // If passwords don't match
    if (newPassword != newPasswordConfirm) {
      this.changePasswordForm.controls['newPassword'].setErrors({'incorrect': true});
      this.changePasswordForm.controls['newPasswordConfirm'].setErrors({'incorrect': true});
    }

    if (!this.changePasswordForm.valid) return;

    this.closeAllModals();

    this.loadingService.enableLoading();
    this.authService.changePassword(oldPassword, newPassword).subscribe(
      success => {
        this.router.navigate(["/login"]);
        this.loadingService.disableLoading();
      },
      fail => {
        this.onFail.emit();
        this.loadingService.disableLoading();
      }
    );
  }

  closeAllModals() {
    this.changePasswordModalShown = false;
  }

  logout() {
    this.authService.logOut().subscribe(() => {
      this.router.navigate(["/login"]);
    });
  }
}
