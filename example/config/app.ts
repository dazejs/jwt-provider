// ts-ignore
import { JwtServiceProvider } from '../../src';


export default {
  providers: [
    JwtServiceProvider.configure({
      secret: 'dazejs'
    })
  ]
};