interface IApiPrefix {
  AUTH: string
  INVENTORY: string
  FORGOT: string
  TEMPLATE: string
  CODES: string
  IP: string
  DOMAIN: string
  STORE: string
  PRODUCT: string
  TRANSACTION: string
  DASHBOARD: string
  CUSTOMER: string
  SYSTEM_SETTING: string
  CONTENT_MANAGEMENT: string
  BILLING: string
  CATEGORY: string
  SUPERUSER: string
  SERVICE: string
  COSTUMER: string
  SUBSCRIPTION: string
  BLOG: string

  SUPER_ADMIN: string
}
export const API_PREFIX: IApiPrefix = {
  AUTH: 'auth',
  INVENTORY: 'inventory',
  FORGOT: 'forgot',
  TEMPLATE: 'template',
  CODES: 'codes',
  IP: 'ip',
  DOMAIN: 'domain',
  STORE: 'store',
  PRODUCT: 'product',
  TRANSACTION: 'transaction',
  DASHBOARD: 'dashboard',

  CUSTOMER: 'customer',
  SYSTEM_SETTING: 'system-setting',
  CONTENT_MANAGEMENT: 'content-management',
  BILLING: 'billing',

  CATEGORY: 'category',
  SUPERUSER: 'superuser',
  SUPER_ADMIN: 'super-admin',
  // ______________________________________________________________________
  SERVICE: 'service',
  COSTUMER: 'costumer',
  SUBSCRIPTION: 'subscription',
  BLOG: 'blog',
}
