// tests/auth.test.ts
import request from 'supertest';
import app from '@/app';

describe('Auth Middleware', () => {
  it('should return 401 without token', async () => {
    const res = await request(app).get('/public/logs');
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 401 with invalid token', async () => {
    const res = await request(app)
      .get('/public/logs')
      .set('authorization-token', 'invalid-uuid');
    expect(res.status).toBe(401);
  });
});
