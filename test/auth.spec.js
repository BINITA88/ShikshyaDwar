import { test, expect } from '@playwright/test';

test.describe('API Login Endpoint', () => {

  // Test for successful login
  test('should log in a user successfully', async ({ request }) => {
    const loginResponse = await request.post('http://localhost:9000/api/login', {
      data: {
        email: 'karan@gmail.com', // Ensure this user exists in the database
        password: 'Karan@123' // Use correct password
      }
    });

    const responseBody = await loginResponse.json();
    console.log('Response:', responseBody);
    console.log('Status Code:', loginResponse.status());

    // Check if the response status is 200 (OK)
    expect(loginResponse.status()).toBe(200);

    // Ensure response contains a valid authentication token
    expect(responseBody).toHaveProperty('token');
    expect(responseBody.token).not.toBeNull();
  });

  

});
