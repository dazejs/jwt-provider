import { Application } from '@dazejs/framework';
import * as path from 'path';
import * as jwt from 'jsonwebtoken';
import request from 'supertest';

const app = new Application(path.join(__dirname, '../daze'));

beforeAll(() => app.run(8585));
afterAll(() => app.close());


describe('jwt provider', () => {
  it('should sign use jwt', async () => {
    const res = await request(app._server).get('/sign');
    expect(res.text).toBe(jwt.sign({ uid: 1}, 'dazejs'));
  });

  it('should verfy use jwt', async () => {
    const token = jwt.sign({ uid: 1 }, 'dazejs');
    const res = await request(app._server).get(`/verify?token=${token}`);
    expect(res.body).toEqual(jwt.verify(token, 'dazejs'));
  });

  it('should decode use jwt', async () => {
    const token = jwt.sign({ uid: 1 }, 'dazejs');
    const res = await request(app._server).get(`/decode?token=${token}`);
    expect(res.body).toEqual(jwt.decode(token));
  });
});