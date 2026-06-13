export interface AccountType {
  createdAt: Date
  email: string
  id: string
  name: string
  roleLevel: string
  status: string
}

export interface CreateAccountType {
  name: string
  email: string
  roleLevel: string
  status: string
}

export interface EditAccountType {
  id: string
  name: string
  email: string
  roleLevel: string
  status: string
}
