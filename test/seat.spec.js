import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:9000/api/seat'; // ✅ Corrected API base path

test.describe('Exam Seat API Tests', () => {
  
  let seatNumber = `S-${Math.floor(Math.random() * 1000)}`; // Generate random seat number


  // ✅ Test 2: Retrieve all seats
  test('should get all seats', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/`);

    console.log('Get Response Status:', response.status());
    if (response.status() === 404) test.fail('API route not found!');

    const responseBody = await response.json();
    console.log('Get Response:', responseBody);

    expect(response.status()).toBe(200);
    expect(Array.isArray(responseBody)).toBe(true);
  });

//   // ✅ Test 3: Get available and unavailable seat status
//   test('should retrieve seat status', async ({ request }) => {
//     const response = await request.get(`${BASE_URL}/status`);

//     console.log('Seat Status Response Status:', response.status());
//     if (response.status() === 404) test.fail('API route not found!');

//     const responseBody = await response.json();
//     console.log('Seat Status Response:', responseBody);

//     expect(response.status()).toBe(200);
//     expect(responseBody).toHaveProperty('availableSeats');
//     expect(responseBody).toHaveProperty('bookedSeats');
//   });

  // ✅ Test 4: Book a seat
  test('should book a seat', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/book`, {
      data: { seatNumber: seatNumber }
    });

    console.log('Book Response Status:', response.status());
    if (response.status() === 404) test.fail('API route not found!');

    const responseBody = await response.json();
    console.log('Book Response:', responseBody);

    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('message', `Seat ${seatNumber} booked successfully`);
  });

  // ✅ Test 5: Unbook a seat
  test('should unbook a seat', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/unbook`, {
      data: { seatNumber: seatNumber }
    });

    console.log('Unbook Response Status:', response.status());
    if (response.status() === 404) test.fail('API route not found!');

    const responseBody = await response.json();
    console.log('Unbook Response:', responseBody);

    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('message', `Seat ${seatNumber} unbooked successfully`);
  });

  // ✅ Test 6: Bulk create seats
  test('should create multiple seats in bulk', async ({ request }) => {
    const bulkSeats = [
      { seatNumber: `S-${Math.floor(Math.random() * 1000)}` },
      { seatNumber: `S-${Math.floor(Math.random() * 1000)}` },
      { seatNumber: `S-${Math.floor(Math.random() * 1000)}` }
    ];

    const response = await request.post(`${BASE_URL}/bulk-create`, {
      data: { seats: bulkSeats },
    });

    console.log('Bulk Create Response Status:', response.status());
    if (response.status() === 404) test.fail('API route not found!');

    const responseBody = await response.json();
    console.log('Bulk Create Response:', responseBody);

    expect(response.status()).toBe(201);
    expect(Array.isArray(responseBody.createdSeats)).toBe(true);
    expect(responseBody.createdSeats.length).toBe(bulkSeats.length);
  });

  // ✅ Test 7: Delete a seat
  test('should delete a seat', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/${seatNumber}`);

    console.log('Delete Response Status:', response.status());
    if (response.status() === 404) test.fail('API route not found!');

    const responseBody = await response.json();
    console.log('Delete Response:', responseBody);

    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('message', `Seat ${seatNumber} deleted successfully`);
  });

});
