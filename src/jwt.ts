import * as jwt from 'jsonwebtoken';

export interface JwtOptions {
  secret: string;
  publicKey?: string;
  privateKey?: string;
  algorithm: jwt.Algorithm;
}

interface SignOption {
  keyid?: string;
  expiresIn?: string | number;
  notBefore?: string | number;
  audience?: string | string[];
  subject?: string;
  issuer?: string;
  jwtid?: string;
  mutatePayload?: boolean;
  noTimestamp?: boolean;
  header?: object;
  encoding?: string;
}

interface VerifyOption {
  audience?: string | RegExp | Array<string | RegExp>;
  clockTimestamp?: number;
  clockTolerance?: number;
  complete?: boolean;
  issuer?: string | string[];
  ignoreExpiration?: boolean;
  ignoreNotBefore?: boolean;
  jwtid?: string;
  nonce?: string;
  subject?: string;
}

export class Jwt {
  options: JwtOptions;
  
  constructor(
    options: JwtOptions
  ) {
    this.options = options;
  }

  sign(
    payload: string | Buffer | object,
    options: SignOption = {}
  ): string {
    const key = this.getSecretOrPrivateKey();
    return jwt.sign(payload, key, {
      ...options,
      algorithm: this.options.algorithm,
    });
  }

  verify(
    token: string,
    options: VerifyOption = {}
  ) {
    const key = this.getSecretOrPublicKey();
    return jwt.verify(token, key, {
      ...options,
      algorithms: [this.options.algorithm]
    });
  }

  decode(
    token: string,
    options?: jwt.DecodeOptions
  ) {
    return jwt.decode(token, options);
  }

  private getSecretOrPrivateKey() {
    const algorithm = this.options.algorithm ?? 'HS256';
    // HMAC
    if (algorithm.startsWith('HS')) {
      if (!this.options.secret) throw new Error('HMAC algorithm must set secret');
      return this.options.secret;
    };
    // RSASSA
    if (algorithm.startsWith('RS')) {
      if (!this.options.privateKey) throw new Error('RSASSA algorithm must set privateKey');
      return this.options.privateKey;
    }
    // ECDSA
    if (algorithm.startsWith('ES')) {
      if (!this.options.privateKey) throw new Error('ECDSA algorithm must set privateKey');
      return this.options.privateKey;
    };
    return '';
  }

  private getSecretOrPublicKey() {
    const algorithm = this.options.algorithm ?? 'HS256';
    // HMAC
    if (algorithm.startsWith('HS')) {
      if (!this.options.secret) throw new Error('HMAC algorithm must set secret');
      return this.options.secret;
    };
    // RSASSA
    if (algorithm.startsWith('RS')) {
      if (!this.options.publicKey) throw new Error('RSASSA algorithm must set publicKey');
      return this.options.publicKey;
    }
    // ECDSA
    if (algorithm.startsWith('ES')) {
      if (!this.options.publicKey) throw new Error('ECDSA algorithm must set publicKey');
      return this.options.publicKey;
    };
    return '';
  }
}