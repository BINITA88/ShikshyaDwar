import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:9000/api/notifications';

test.describe('Notification API Tests', () => {
  
  let notificationId = null; // To store created notification ID

  // ✅ Test 1: Create a new notification
  test('should create a new notification', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/create`, {
      data: {
        message: 'This is a test notification',
      }
    });

    const responseBody = await response.json();
    console.log('Create Response:', responseBody);

    expect(response.status()).toBe(201);
    expect(responseBody).toHaveProperty('newNotification._id'); // ✅ Corrected path
    expect(responseBody).toHaveProperty('newNotification.message', 'This is a test notification');

    notificationId = responseBody.newNotification._id; // ✅ Store correct ID
  });

  // ✅ Test 2: Retrieve all notifications
  test('should get all notifications', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/`);
    
    const responseBody = await response.json();
    console.log('Get Response:', responseBody);

    expect(response.status()).toBe(200);
    expect(Array.isArray(responseBody)).toBe(true);
  });

  // ✅ Test 3: Update a notification
  test('should update an existing notification', async ({ request }) => {
    if (!notificationId) test.skip('No notification available to update'); // ✅ Skip if no notification

    const response = await request.put(`${BASE_URL}/update/${notificationId}`, {
      data: {
        message: 'This is an updated test notification',
      }
    });

    const responseBody = await response.json();
    console.log('Update Response:', responseBody);

    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('message', 'Notification updated successfully');
  });

  // ✅ Test 4: Delete a notification
  test('should delete a notification', async ({ request }) => {
    if (!notificationId) test.skip('No notification available to delete'); // ✅ Skip if no notification

    const response = await request.delete(`${BASE_URL}/delete/${notificationId}`);

    const responseBody = await response.json();
    console.log('Delete Response:', responseBody);

    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('message', 'Notification deleted successfully');

    // ✅ Verify notification no longer exists
    const getResponse = await request.get(`${BASE_URL}/`);
    const getResponseBody = await getResponse.json();
    expect(getResponseBody.find(n => n._id === notificationId)).toBeUndefined();
  });

});
