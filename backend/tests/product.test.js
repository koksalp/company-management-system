const request = require('supertest');
const app = require('../src/app');

describe('Product API (cookie auth)', () => {
  const agent = request.agent(app);

  const username = `testuser_${Date.now()}`;
  const password = 'Test123!';

  let companyId;
  let productId;

  beforeAll(async () => {
    await agent.post('/auth/register').send({
      username,
      password
    });

    await agent.post('/auth/login').send({
      username,
      password
    });

    const companyRes = await agent.post('/company').send({
      name: 'Test Company',
      legalNumber: `LC-${Date.now()}`,
      incorporationCountry: 'USA',
      website: 'https://test.com'
    });

    companyId = companyRes.body.id;
  });

  test('should create product', async () => {
    const body = {
      name: 'CRM System',
      category: 'Software',
      amount: 1200,
      amountUnit: 'USD',
      companyId
    };

    const res = await agent.post('/product').send(body);

    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();

    productId = res.body.id;
  });

  test('should get products', async () => {
    const res = await agent.get('/product');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('should update product', async () => {
    const res = await agent
      .put(`/product/${productId}`)
      .send({ name: 'Updated CRM' });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Updated CRM');
  });

  test('should delete product', async () => {
    const res = await agent.delete(`/product/${productId}`);

    expect(res.statusCode).toBe(200);
  });
}); 
