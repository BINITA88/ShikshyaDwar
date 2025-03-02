import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:9000/api';

test.describe('Category API Tests', () => {
  let categoryId = null; // Store category ID for update and delete operations


  // ✅ Test 2: Create a new category (With Unique Name)
  test('should create a new category', async ({ request }) => {
    const uniqueCategory = `Electronics_${Date.now()}`; // ✅ Ensure unique category name

    const response = await request.post(`${BASE_URL}/postcategory`, {
      data: { category_name: uniqueCategory }
    });

    console.log('Create Response Status:', response.status());
    const responseBody = await response.json();
    console.log('Create Response:', responseBody);

    if (response.status() === 404) throw new Error('❌ API route not found! Check server.js');
    if (response.status() === 500) throw new Error('❌ Server error! Check logs.');

    expect([200, 201]).toContain(response.status()); // ✅ Handle both 200 and 201
    expect(responseBody).toHaveProperty('_id');
    categoryId = responseBody._id;
  });

  // ✅ Test 3: Retrieve all categories
  test('should get all categories', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/categoryList`);

    console.log('Get Response Status:', response.status());
    const responseBody = await response.json();
    console.log('Get Response:', responseBody);

    expect(response.status()).toBe(200);
    expect(Array.isArray(responseBody)).toBe(true);
  });

  // ✅ Test 4: Retrieve category details
  test('should get category details', async ({ request }) => {
    if (!categoryId) test.skip('No category ID available for testing');

    const response = await request.get(`${BASE_URL}/categoryDetails/${categoryId}`);

    console.log('Category Details Response Status:', response.status());
    const responseBody = await response.json();
    console.log('Category Details Response:', responseBody);

    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('_id', categoryId);
  });

  


});
