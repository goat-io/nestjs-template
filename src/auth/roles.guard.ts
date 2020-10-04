import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

import { Auth } from '@goatlab/fluent/dist/core/Nestjs/Auth/Auth'

@Injectable()
export class RolesGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { url, HTTPMethod, handlerName, user } = Auth.parseContext(context)

    console.log(url)
    console.log(HTTPMethod)
    console.log(handlerName)
    console.log('We are validating the request')
    console.log(user)
    return true
  }
}
