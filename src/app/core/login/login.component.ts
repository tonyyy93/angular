import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup;
  isLoading = false;
  message: string;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    const username = '';
    const password = '';

    this.signinForm = new FormGroup({
      username: new FormControl(username, [
        Validators.required
      ]),
      password: new FormControl(password, Validators.required)
    });
  }

  public onLogin() {
    // Show loading
    this.isLoading = true;

    // Close loading after 1 second
    setTimeout(() => {
      this.isLoading = false;
    }, 5000);

    this.authService.login(
      this.signinForm.value.username,
      this.signinForm.value.password
    ).subscribe(
      res => {
        localStorage.setItem('token', res.data);
        this.router.navigate(['/home']);
      },
      error => {

      },
      () => {
        this.isLoading = false;
      }
    );
  }

}
