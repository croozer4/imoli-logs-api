import request from 'supertest';
import app from '../src/app';

describe('Auth Middleware', () => {
  it('should return 401 without token', async () => {
    const res = await request(app).get('/public/logs');
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

it('should return 403 admin missing read permission', async () => {
    const res = await request(app)
      .get('/public/logs')
      .set('authorization-token', '320ca9c4-ed20-4f09-bcb8-9b34b976b501')
      .timeout(10000);
    expect(res.status).toBe(403); 
  });

  it('should return 200 valid read token', async () => {
    const res = await request(app)
      .get('/public/logs')
      .set('authorization-token', 'a5c9700a-684e-11ea-bc55-0242ac130003')
      .timeout(10000);
    expect(res.status).toBe(200);
  });
});
