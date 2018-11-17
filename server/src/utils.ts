import * as jwt from 'jsonwebtoken'
const APP_SECRET = 'Foton-is-awesome'

function getLoggedUserId(context: any) {
  let token = context.token

  if (token) {
    token = token.replace('Bearer ', '')
    const { userId } = jwt.verify(token, APP_SECRET) as any

    return userId
  }

  return null
}

export { APP_SECRET, getLoggedUserId }
