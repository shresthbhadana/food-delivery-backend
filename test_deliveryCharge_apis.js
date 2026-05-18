const assert = require('assert');

async function testDeliveryChargeApis() {
  console.log("🚀 Starting Delivery Charge API Tests...\n");
  const baseUrl = "http://127.0.0.1:3000";
  // We use testUid to bypass the authMiddleware for testing
  const authQuery = "?testUid=test_admin_123";
  let scheduleId;

  try {
    // 1. Create Delivery Charge Schedule
    console.log("1. Testing POST /admin/deliveryCharges/create...");
    
    // Create dates for testing
    const now = new Date();
    const startDate = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour from now
    const endDate = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 hours from now

    let res = await fetch(`${baseUrl}/admin/deliveryCharges/create${authQuery}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deliveryCharge: 75.5,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        status: "Pending"
      })
    });
    let data = await res.json();
    assert.strictEqual(data.success, true, `Expected success, got: ${JSON.stringify(data)}`);
    scheduleId = data.data.id;
    console.log(`✅ Delivery Charge Schedule created successfully! ID: ${scheduleId}\n`);

    // 2. Get All Delivery Charges
    console.log("2. Testing GET /admin/deliveryCharges/getAll...");
    res = await fetch(`${baseUrl}/admin/deliveryCharges/getAll${authQuery}`);
    data = await res.json();
    assert.strictEqual(data.success, true, `Expected success, got: ${JSON.stringify(data)}`);
    assert(Array.isArray(data.data), "Data should be an array");
    console.log(`✅ Fetched All Delivery Charge Schedules successfully! Count: ${data.data.length}\n`);

    // 3. Update Delivery Charge
    console.log(`3. Testing PUT /admin/deliveryCharges/update/${scheduleId}...`);
    const newStartDate = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 hours from now
    const newEndDate = new Date(now.getTime() + 3 * 60 * 60 * 1000); // 3 hours from now

    res = await fetch(`${baseUrl}/admin/deliveryCharges/update/${scheduleId}${authQuery}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deliveryCharge: 120.0,
        startDate: newStartDate.toISOString(),
        endDate: newEndDate.toISOString(),
        status: "Completed" // Normally updated by cron, just testing endpoint here
      })
    });
    data = await res.json();
    assert.strictEqual(data.success, true, `Expected success, got: ${JSON.stringify(data)}`);
    console.log("✅ Delivery Charge Schedule updated successfully!\n");

    // 4. Delete Delivery Charge
    console.log(`4. Testing DELETE /admin/deliveryCharges/delete/${scheduleId}...`);
    res = await fetch(`${baseUrl}/admin/deliveryCharges/delete/${scheduleId}${authQuery}`, {
      method: 'DELETE'
    });
    data = await res.json();
    assert.strictEqual(data.success, true, `Expected success, got: ${JSON.stringify(data)}`);
    console.log("✅ Delivery Charge Schedule deleted successfully!\n");

    console.log("🎉 All Delivery Charge APIs tested successfully!");
  } catch (error) {
    console.error("❌ Test Failed:", error);
  }
}

testDeliveryChargeApis();
