import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { CreateUserValidator } from 'App/Validators/UserValidator'

export default class AuthController {
  public async register({ request, auth }: HttpContextContract) {
    const payload = await request.validate(CreateUserValidator)

    const user = await User.create(payload)
    await auth.login(user)
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const { email, password } = request.only(['email', 'password'])

    try {
      await auth.attempt(email, password)
    } catch {
      response.badRequest({ error: 'Invalid login credentials' })
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.logout()
  }
}
