const assert = require('assert');

async function testAll() {
  console.log("🚀 Starting API Tests...\n");
  const baseUrl = "http://localhost:3000/users/orders";
  
  try {
    // 1. Create PreOrder
    console.log("1. Testing POST /createPreOrder...");
    const createPayload = {
      userId: "testUser123",
      userName: "Alice",
      phoneNumber: "1234567890",
      vendorId: "vendorABC",
      items: [{ id: "item1", price: 100, quantity: 2 }],
      deliveryAddress: { street: "123 Main St" },
      deliverySchedule: { time: "10:00 AM" },
      commissionPercent: 10,
      deliveryCharge: 20
    };
    
    let res = await fetch(`${baseUrl}/createPreOrder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(createPayload)
    });
    let data = await res.json();
    assert.strictEqual(data.success, true, `Expected success, got: ${JSON.stringify(data)}`);
    const orderId = data.data.id;
    console.log(`✅ Created PreOrder successfully! ID: ${orderId}\n`);

    // 2. Get PreOrder By ID
    console.log(`2. Testing GET /getPreOrderById/${orderId}...`);
    res = await fetch(`${baseUrl}/getPreOrderById/${orderId}`);
    data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.data.id, orderId);
    console.log("✅ Fetched PreOrder by ID successfully!\n");

    // 3. Update PreOrder
    console.log(`3. Testing PUT /updatePreOrder/${orderId}...`);
    const updatePayload = { remark: "Please add extra sauce" };
    res = await fetch(`${baseUrl}/updatePreOrder/${orderId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatePayload)
    });
    data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.data.remark, "Please add extra sauce");
    console.log("✅ Updated PreOrder successfully!\n");

    // 4. Accept/Reject PreOrder
    console.log(`4. Testing PUT /acceptOrRejectPreOrder/${orderId}...`);
    res = await fetch(`${baseUrl}/acceptOrRejectPreOrder/${orderId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: "Accepted" })
    });
    data = await res.json();
    assert.strictEqual(data.success, true, `Expected success, got: ${JSON.stringify(data)}`);
    assert.strictEqual(data.data.status, "Accepted");
    console.log("✅ Accepted PreOrder successfully!\n");

    // 5. Get All PreOrders by User
    console.log("5. Testing GET /getAllPreOrders...");
    res = await fetch(`${baseUrl}/getAllPreOrders?userId=testUser123`);
    data = await res.json();
    assert.strictEqual(data.success, true, `Expected success, got: ${JSON.stringify(data)}`);
    assert(data.total >= 1);
    console.log(`✅ Fetched User PreOrders successfully! Count: ${data.total}\n`);

    // 6. Get All PreOrders by Vendor
    console.log("6. Testing GET /getAllPreOrdersByVendor...");
    res = await fetch(`${baseUrl}/getAllPreOrdersByVendor?vendorId=vendorABC`);
    data = await res.json();
    assert.strictEqual(data.success, true);
    assert(data.total >= 1);
    console.log(`✅ Fetched Vendor PreOrders successfully! Count: ${data.total}\n`);

    // 7. Admin Get All
    console.log("7. Testing GET /admin/getAllPreOrders...");
    res = await fetch(`${baseUrl}/admin/getAllPreOrders`);
    data = await res.json();
    assert.strictEqual(data.success, true);
    assert(data.total >= 1);
    console.log(`✅ Admin Fetched All PreOrders successfully! Count: ${data.total}\n`);

    // 8. Delete PreOrder
    console.log(`8. Testing DELETE /deletePreOrderById/${orderId}...`);
    res = await fetch(`${baseUrl}/deletePreOrderById/${orderId}`, { method: 'DELETE' });
    data = await res.json();
    assert.strictEqual(data.success, true);
    console.log("✅ Deleted PreOrder successfully!\n");

    console.log("🎉 All 8 APIs tested successfully!");
  } catch (error) {
    console.error("❌ Test Failed:", error);
  }
}

testAll();
