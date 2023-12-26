import { Component, OnInit, OnDestroy, Input } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AccountService } from 'src/app/services/account.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup
  isSubmitted = false
  returnUrl = ''
  private loginSubscription: Subscription | undefined

  @Input() returnToSignUp = '/signup'

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl']
  }

  get fc() {
    return this.loginForm.controls
  }

  submit() {
    this.isSubmitted = true

    if (this.loginForm.invalid) return

    const loginData: { email: string; password: string } = {
      email: this.fc['email'].value,
      password: this.fc['password'].value,
    }

    this.loginSubscription = this.accountService.logIn(loginData).subscribe({
      next: () => {
        this.router.navigateByUrl(this.returnUrl)
      },
      error: (error: any) => {
        console.error('Login error: ', error)
      },
    })
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe()
    }
  }
}
