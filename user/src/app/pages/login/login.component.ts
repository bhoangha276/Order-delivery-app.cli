import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AccountService } from 'src/app/services/account.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  isSubmited = false
  returnUrl = ''

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private activedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })

    this.returnUrl = this.activedRoute.snapshot.queryParams['returnUrl']
  }

  get fc() {
    return this.loginForm.controls
  }

  submit() {
    this.isSubmited = true

    if (this.loginForm.invalid) return
    this.accountService
      .login({
        email: this.fc['email'].value,
        password: this.fc['password'].value,
      })
      .subscribe(() => {
        this.router.navigateByUrl(this.returnUrl)
      })
  }
}
