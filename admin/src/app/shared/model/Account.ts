export class Account {
  _id!: String
  email!: String
  password!: String
  role!: String
  emailVerified!: boolean
  phoneVerified!: boolean
  status!: boolean
  token!: String
}

export class Login {
  email!: String
  password!: String
}
