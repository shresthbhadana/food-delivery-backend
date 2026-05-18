const assert = require('assert');

async function testScheduleMessageApis() {
  console.log("🚀 Starting Scheduled Message API Tests...\n");
  const baseUrl = "http://127.0.0.1:3000";
  // Bypassing authMiddleware using testUid
  const authQuery = "?testUid=test_admin_123";
  let messageId;

  try {
    // 1. Create Scheduled Message
    console.log("1. Testing POST /admin/messages/create...");
    
    // Create a time for testing (e.g. tomorrow)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    let res = await fetch(`${baseUrl}/admin/messages/create${authQuery}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: "Weekend Flash Sale!",
        message: "Get 50% off on all pizzas this weekend. Order now!",
        isActive: true,
        scheduledTime: tomorrow.toISOString(),
        frequency: "every-weeks"
      })
    });
    let data = await res.json();
    assert.strictEqual(data.success, true, `Expected success, got: ${JSON.stringify(data)}`);
    messageId = data.data.id;
    console.log(`✅ Scheduled Message created successfully! ID: ${messageId}\n`);

    // 2. Get All Scheduled Messages
    console.log("2. Testing GET /admin/messages/getAll...");
    res = await fetch(`${baseUrl}/admin/messages/getAll${authQuery}`);
    data = await res.json();
    assert.strictEqual(data.success, true, `Expected success, got: ${JSON.stringify(data)}`);
    assert(Array.isArray(data.data), "Data should be an array");
    console.log(`✅ Fetched All Scheduled Messages successfully! Count: ${data.data.length}\n`);

    // 3. Update Scheduled Message
    console.log(`3. Testing PUT /admin/messages/update/${messageId}...`);
    
    // Change frequency and title
    res = await fetch(`${baseUrl}/admin/messages/update/${messageId}${authQuery}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: "Weekend Flash Sale (UPDATED)!",
        message: "Get 60% off on all pizzas this weekend. Order now!",
        isActive: false,
        scheduledTime: tomorrow.toISOString(),
        frequency: "daily"
      })
    });
    data = await res.json();
    assert.strictEqual(data.success, true, `Expected success, got: ${JSON.stringify(data)}`);
    assert.strictEqual(data.data.title, "Weekend Flash Sale (UPDATED)!", "Title should be updated");
    assert.strictEqual(data.data.isActive, false, "isActive should be updated");
    console.log("✅ Scheduled Message updated successfully!\n");

    // 4. Delete Scheduled Message
    console.log(`4. Testing DELETE /admin/messages/delete/${messageId}...`);
    res = await fetch(`${baseUrl}/admin/messages/delete/${messageId}${authQuery}`, {
      method: 'DELETE'
    });
    data = await res.json();
    assert.strictEqual(data.success, true, `Expected success, got: ${JSON.stringify(data)}`);
    console.log("✅ Scheduled Message deleted successfully!\n");

    console.log("🎉 All Scheduled Message APIs tested successfully!");
  } catch (error) {
    console.error("❌ Test Failed:", error);
  }
}

testScheduleMessageApis();
