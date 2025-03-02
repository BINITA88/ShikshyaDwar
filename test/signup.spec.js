
import { test, expect } from '@playwright/test';

test.describe('API Register Endpoint', () => {
  // starting test
  // ✅ Test for successful registration
  test('should register a new user successfully', async ({ request }) => {
    const email = `testuser1${Date.now()}@example.com`; // Unique email for every test run
    const response = await request.post('http://localhost:9000/api/register', {
      data: {
        name: 'Test User',
        email: email,
        password: 'Password1@123' // Strong password
      }
    });

    const responseBody = await response.json();
    console.log('Response:', responseBody); 
    console.log('Status Code:', response.status()); 

    // ✅ Accepts both 200 and 201
    expect([200, 201]).toContain(response.status());


    expect(responseBody).toHaveProperty('message', 'Registration successful! Please check your email to verify your account.');
  });

  // ✅ Test for error when required fields are missing
  test('should return an error when required fields are missing', async ({ request }) => {
    const response = await request.post('http://localhost:9000/api/register', {
      data: {
        name: 'Test User',
        password: 'Password@123'
      }
    });

    const responseBody = await response.json();
    console.log('Error Response:', responseBody);

    expect(response.status()).toBe(400);
    expect(responseBody).toHaveProperty('error', 'email is mandatory');
  });

  // ✅ Test for strong password validation
  test('should register a user successfully with a strong password', async ({ request }) => {
    const email = `secureuser${Date.now()}@example.com`; // Unique email for each test
    const password = 'SecureP@ssword123!'; // Strong password

    const response = await request.post('http://localhost:9000/api/register', {
      data: {
        name: 'Secure User',
        email: email,
        password: password
      }
    });

    const responseBody = await response.json();
    console.log('Response:', responseBody); 
    console.log('Status Code:', response.status()); 

    // ✅ Accepts both 200 and 201
    expect([200, 201]).toContain(response.status());

    // ✅ Ensure response contains the expected message
    expect(responseBody).toHaveProperty('message', 'Registration successful! Please check your email to verify your account.');
  });

});
