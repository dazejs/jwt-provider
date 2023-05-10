import { Provider, Provide, config, app } from '@dazejs/framework';
import { Jwt } from './jwt';
import * as jwt from 'jsonwebtoken';

export interface JwtServiceProviderOptions {
  secret?: string;
  publicKey?: string;
  privateKey?: string;
  algorithm?: jwt.Algorithm;
}

@Provider()
export class JwtServiceProvider {

  private static secret?: string | Buffer;

  private static publicKey?: string | Buffer;

  private static privateKey?: jwt.Secret;

  private static algorithm?: jwt.Algorithm;

  @Provide()
  protected jwt(options: any) {
    return new Jwt(options);
  }

  static configure(options: JwtServiceProviderOptions) {
    this.secret = options.secret;
    this.publicKey = options.publicKey;
    this.privateKey = options.privateKey;
    this.algorithm = options.algorithm;
    return this;
  }

  launch () {
    const jwtConfig = config().get('jwt', {}) as JwtServiceProviderOptions;
    app().make('jwt', [{
      secret: JwtServiceProvider.secret ?? jwtConfig.secret,
      publicKey: JwtServiceProvider.publicKey ?? jwtConfig.privateKey,
      privateKey: JwtServiceProvider.privateKey ?? jwtConfig.privateKey,
      algorithm: JwtServiceProvider.algorithm ?? jwtConfig.algorithm ?? 'HS256'
    }]);
  }
}