import { BaseProvider, provide, conf } from '@dazejs/framework';
import { Jwt } from './jwt';
import * as jwt from 'jsonwebtoken';

export interface JwtServiceProviderOptions {
  secret?: string;
  publicKey?: string;
  privateKey?: string;
  algorithm?: jwt.Algorithm;
}

export class JwtServiceProvider extends BaseProvider {

  private static secret?: string | Buffer;

  private static publicKey?: string | Buffer;

  private static privateKey?: jwt.Secret;

  private static algorithm?: jwt.Algorithm;

  @conf('jwt', {}) jwtConfig: JwtServiceProviderOptions;

  @provide()
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
    this.app.make('jwt', [{
      secret: JwtServiceProvider.secret ?? this.jwtConfig.secret,
      publicKey: JwtServiceProvider.publicKey ?? this.jwtConfig.privateKey,
      privateKey: JwtServiceProvider.privateKey ?? this.jwtConfig.privateKey,
      algorithm: JwtServiceProvider.algorithm ?? this.jwtConfig.algorithm ?? 'HS256'
    }]);
  }
}