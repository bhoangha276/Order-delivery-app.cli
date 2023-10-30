import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  isSubmited = false

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    })
  }

  get fc() {
    return this.loginForm.controls
  }

  submit() {
    this.isSubmited = true

    if (this.loginForm.invalid) return

    alert(
      `Email: ${this.fc['email'].value} \n Password: ${this.fc['password'].value}`,
    )
  }
}
