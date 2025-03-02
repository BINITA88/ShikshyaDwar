// import { test, expect } from '@playwright/test';

// test.describe('API Forget Password Endpoint', () => {
  
//   // ✅ Test for successful password reset request
//   test('should send a password reset link successfully', async ({ request }) => {
//     const response = await request.post('http://localhost:9000/api/forgotpassword', {
//       data: {
//         email: 'karan@gmail.com' // Ensure this email exists in the system
//       }
//     });

//     const responseBody = await response.json();
//     console.log('Response:', responseBody);
//     console.log('Status Code:', response.status());

//     // Accepts both 200 and 202
//     expect([200, 202]).toContain(response.status());

//     // ✅ Fix: Match exact response string
//     expect(responseBody).toHaveProperty('message', 'password reset link has been sent successfully.');
//   });

//   // ❌ Test for error when email is not found
//   test('should return an error when email is not found', async ({ request }) => {
//     const response = await request.post('http://localhost:9000/api/forgotpassword', {
//       data: {
//         email: 'nonexistentuser@example.com' // Non-existent email
//       }
//     });

//     const responseBody = await response.json();
//     console.log('Error Response:', responseBody);

//     // Accepts both 400 and 404
//     expect([400, 404]).toContain(response.status());

//     // ✅ Fix: Match exact response string
//     expect(responseBody).toHaveProperty('error', 'sorry the email you have provided is not found in our system.');
//   });

// });