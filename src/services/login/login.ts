import hyRequest from '..'

export function loginAccount(account: any) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}
