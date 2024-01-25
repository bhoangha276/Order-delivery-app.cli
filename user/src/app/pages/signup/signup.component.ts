import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AccountService } from 'src/app/services/account.service'
import { IAccountSignup } from 'src/app/shared/interfaces/IAccount'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
  signupForm!: FormGroup
  isSubmitted = false
  returnUrl = ''
  private signupSubscription?: Subscription

  @Input() returnToLogin = '/login'

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })

    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl']
  }

  get fc() {
    return this.signupForm.controls
  }

  private navigateToSuccess(): void {
    this.router.navigateByUrl('/sign-up-success')
  }

  submit() {
    this.isSubmitted = true

    if (this.signupForm.invalid) return

    const signupData: IAccountSignup = {
      name: this.fc['name'].value,
      email: this.fc['email'].value,
      password: this.fc['password'].value,
    }

    this.signupSubscription = this.accountService.signUp(signupData).subscribe({
      next: () => {
        this.navigateToSuccess()
      },
      error: (error: any) => {
        console.error('Sign up error: ', error)
      },
    })
  }

  ngOnDestroy(): void {
    if (this.signupSubscription) {
      this.signupSubscription.unsubscribe()
    }
  }
}
