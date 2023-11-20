import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { AccountService } from 'src/app/services/account.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  isSubmited = false
  responseMessage: any

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    public dialogRef: MatDialogRef<LoginComponent>,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    })
  }

  get fc() {
    return this.loginForm.controls
  }

  handleSubmit() {
    this.isSubmited = true
    const data = {
      email: this.fc['email'].value,
      password: this.fc['password'].value,
    }

    if (this.loginForm.invalid) return
    this.accountService.login(data).subscribe(() => {
      this.dialogRef.close()
      this.router.navigate(['/home'])
    })
  }
}
