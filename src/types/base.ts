export enum RoleLevel {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  USER = 'USER',
  CLIENT = 'CLIENT',
}

export enum AccountStatus {
  ON = 'ON',
  OFF = 'OFF',
}

export interface AccountType {
  createdAt: Date
  email: string
  id: string
  name: string
  roleLevel: RoleLevel
  status: AccountStatus
}

export type CreateAccountType = Omit<AccountType, 'id' | 'createdAt'>

export type EditAccountType = Omit<AccountType, 'createdAt'>
