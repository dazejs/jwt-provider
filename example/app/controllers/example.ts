// ts-ignore
import { Controller, http, route, inject } from '@dazejs/framework';
import { Jwt } from '../../../src';
@route()
export default class Example extends Controller {

  @inject(Jwt) jwt: Jwt;

  @http.get()
  sign() {
    return this.jwt.sign({
      uid: 1
    });
  }

  @http.get('verify')
  verify() {
    return this.jwt.verify(this.request.getParam('token'));
  }
}