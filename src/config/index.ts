export const storeTokenKey: string = 'react_bulma_admin_token_by_genesis'

export const pageSize: number = 10

type validity = {
  rule: any,
  message: string
}

export const NAME_RULE: validity = {
  rule: '[0-9A-Za-z_]+',
  message: '数字字母或下划线'
}

export const PASSWORD_RULE: validity = {
  rule: '[0-9A-Za-z_]+',
  message: '数字字母或下划线'
}
