[![GitHub issues](https://img.shields.io/github/issues/dazejs/jwt-provider.svg)](https://github.com/dazejs/jwt-provider/issues)
[![npm](https://img.shields.io/npm/v/@dazejs/jwt-provider.svg)](https://www.npmjs.com/package/@dazejs/jwt-provider)
[![npm](https://img.shields.io/npm/dm/@dazejs/jwt-provider.svg)](https://www.npmjs.com/package/@dazejs/jwt-provider)
[![actions](https://github.com/dazejs/jwt-provider/workflows/Node%20CI/badge.svg?branch=master)](https://github.com/dazejs/jwt-provider/actions)
[![codecov](https://codecov.io/gh/dazejs/jwt-provider/branch/master/graph/badge.svg)](https://codecov.io/gh/dazejs/jwt-provider)
[![GitHub license](https://img.shields.io/github/license/dazejs/jwt-provider.svg)](https://github.com/dazejs/jwt-provider/blob/master/LICENSE)

# Jwt Provider

基于 Daze.js 的 jwt 扩展

## 安装

```bash
$ npm i --save @dazejs/jwt-provider
```

## 使用 

首先在 `/src/config/app.ts` 将提供者注册到框架中：


```ts
import { JwtServiceProvider } from '@dazejs/jwt-provider';

export default {
  // ...
  providers: [
    // ...
    JwtServiceProvider.configure({
      secret: 'hard!to-guess_secret',
      privateKey: '...',
      publicKey: '...',
      algorithm: 'HS256',
    })
  ]
}
```

`configure` 方法用来配置 `JwtServiceProvider`, 参数支持：
- `secret`: `HMAC` / `PEM` 加密需要配置该参数
- `publicKey` / `privateKey`: `RSA` / `ECDSA` 加密所需的公钥和私钥
- `algorithm`: 默认所使用的加密算法，详细可以查看 [`crypto`](https://nodejs.org/api/crypto.html#crypto_sign_sign_private_key_output_format)

使用 `@inject` 进行注入即可使用 

```ts
import { Controller, route, http, inject } from '@dazejs/framework'
import { Jwt } from '@dazejs/jwt-provider'

@route('users')
export class User extends Controller {

    @inject() jwt: Jwt;

    // get /users
    @http.het()
    index() {
        const token = this.jwt.sign({
          uid: 1
        })
        return token
    }
}
```

### Jwt

`Jwt` 是基于 [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) 实现的

**`sign(payload: string | Object | Buffer, options?: SignOption): string`**

该方法基于 `jsonwebtoken` 的 `sign` 方法实现

**`verify(token: string, options?: VerifyOption): any`**

该方法基于 `jsonwebtoken` 的 `verify` 方法实现

**`decode(token: string, options: DecodeOptions): object | string`**

该方法基于 `jsonwebtoken` 的 `decode` 方法实现
