export class Account {
  _id!: string
  email!: string
  password!: string
  role!: string
  emailVerified!: boolean
  phoneVerified!: boolean
  status!: boolean
  token!: string
}

export class Login {
  email!: string
  password!: string
}
