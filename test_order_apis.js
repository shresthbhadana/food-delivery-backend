const assert = require('assert');

async function testAllOrders() {
  console.log("🚀 Starting Order API Tests...\n");
  const baseUrl = "http://localhost:3000";
  
  try {
    // 1. Create Order
    console.log("1. Testing POST /orders-api/order...");
    const createPayload = {
      userId: "testUser123",
      userName: "Bob",
      phoneNumber: "9876543210",
      items: [
        { id: "item1", price: 100, quantity: 2, vendorId: "vendorABC" },
        { id: "item2", price: 50, quantity: 1, vendorId: "vendorXYZ" }
      ],
      deliveryAddress: { street: "456 Elm St" },
      totalPrice: 250,
      commissionPercent: 10,
      deliveryCharge: 20
    };
    
    let res = await fetch(`${baseUrl}/orders-api/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(createPayload)
    });
    let data = await res.json();
    assert.strictEqual(data.success, true, `Expected success, got: ${JSON.stringify(data)}`);
    const orderId = data.data.id;
    console.log(`✅ Created Order successfully! ID: ${orderId}\n`);

    // 2. Get Live Order By ID
    console.log(`2. Testing GET /users/orders/getLiveOrderById/${orderId}...`);
    res = await fetch(`${baseUrl}/users/orders/getLiveOrderById/${orderId}`);
    data = await res.json();
    assert.strictEqual(data.success, true, `Expected success, got: ${JSON.stringify(data)}`);
    assert.strictEqual(data.data.id, orderId);
    console.log("✅ Fetched Live Order by ID successfully!\n");

    // 3. Update Order Status
    console.log(`3. Testing POST /orders-api/updateOrder...`);
    const updatePayload = { orderId: orderId, status: "accepted" };
    res = await fetch(`${baseUrl}/orders-api/updateOrder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatePayload)
    });
    data = await res.json();
    assert.strictEqual(data.success, true, `Expected success, got: ${JSON.stringify(data)}`);
    assert.strictEqual(data.data.status, "accepted");
    console.log("✅ Updated Order Status successfully!\n");

    // 4. Get All Live Orders for User
    console.log("4. Testing GET /users/orders/getAllLiveOrders...");
    res = await fetch(`${baseUrl}/users/orders/getAllLiveOrders?userId=testUser123`);
    data = await res.json();
    assert.strictEqual(data.success, true, `Expected success, got: ${JSON.stringify(data)}`);
    assert(data.total >= 1);
    console.log(`✅ Fetched User Live Orders successfully! Count: ${data.total}\n`);

    // 5. Admin Get All Orders
    console.log("5. Testing GET /admin/orders/getAll...");
    res = await fetch(`${baseUrl}/admin/orders/getAll`);
    data = await res.json();
    assert.strictEqual(data.success, true, `Expected success, got: ${JSON.stringify(data)}`);
    assert(data.total >= 1);
    console.log(`✅ Admin Fetched All Orders successfully! Count: ${data.total}\n`);

    // 6. Admin Get Order By ID
    console.log(`6. Testing GET /admin/orders/getById/${orderId}...`);
    res = await fetch(`${baseUrl}/admin/orders/getById/${orderId}`);
    data = await res.json();
    assert.strictEqual(data.success, true, `Expected success, got: ${JSON.stringify(data)}`);
    assert.strictEqual(data.data.id, orderId);
    console.log("✅ Admin Fetched Order by ID successfully!\n");

    // 7. Vendor Get Vendor Orders
    console.log("7. Testing GET /vendor/orders/getVendorOrders...");
    res = await fetch(`${baseUrl}/vendor/orders/getVendorOrders?vendorId=vendorABC`);
    data = await res.json();
    assert.strictEqual(data.success, true, `Expected success, got: ${JSON.stringify(data)}`);
    assert(data.total >= 1);
    console.log(`✅ Fetched Vendor Orders successfully! Count: ${data.total}\n`);

    // 8. Vendor Get Vendor Order By ID
    // We grab the ID from the previous response
    const vendorOrderId = data.data[0].id;
    console.log(`8. Testing GET /vendor/orders/getVendorOrderById/${vendorOrderId}...`);
    res = await fetch(`${baseUrl}/vendor/orders/getVendorOrderById/${vendorOrderId}`);
    data = await res.json();
    assert.strictEqual(data.success, true, `Expected success, got: ${JSON.stringify(data)}`);
    assert.strictEqual(data.data.id, vendorOrderId);
    console.log("✅ Fetched Vendor Order by ID successfully!\n");

    console.log("🎉 All 8 Order APIs tested successfully!");
  } catch (error) {
    console.error("❌ Test Failed:", error);
  }
}

testAllOrders();
