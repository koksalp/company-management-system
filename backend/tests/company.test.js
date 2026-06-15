const request = require('supertest');
const app = require('../src/app');

describe('Company API (cookie auth)', () => {
  const agent = request.agent(app);

  const username = `testuser_${Date.now()}`;
  const password = 'Test123!';

  let companyId;

  beforeAll(async () => {
    await agent.post('/auth/register').send({
      username,
      password
    });

    await agent.post('/auth/login').send({
      username,
      password
    });
  });

  test('should create company', async () => {
    const body = {
      name: 'Test Company',
      legalNumber: `LC-${Date.now()}`,
      incorporationCountry: 'USA',
      website: 'https://test.com'
    };

    const res = await agent.post('/company').send(body);

    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();

    companyId = res.body.id;
  });

  test('should get companies', async () => {
    const res = await agent.get('/company');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('should update company', async () => {
    const res = await agent
      .put(`/company/${companyId}`)
      .send({ name: 'Updated Company' });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Updated Company');
  });

  test('should delete company', async () => {
    const res = await agent.delete(`/company/${companyId}`);

    expect(res.statusCode).toBe(200);
  });
}); 

