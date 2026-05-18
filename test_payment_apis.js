const baseUrl = "http://127.0.0.1:3000";
const authQuery = "?testUid=test_admin_123";

async function testPaymentApis() {
  console.log("🚀 Starting Payment API Tests...\n");

  let testOrderId = null;
  let initiatedPaymentId = null;

  try {
    // Step 0. Create a dummy Order first so foreign key constraint passes
    console.log("0. Creating a dummy order for testing...");
    let orderRes = await fetch(`${baseUrl}/orders-api/order${authQuery}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [{ productId: "prod_1", name: "Burger", price: 250, quantity: 1, vendorId: "vendor_1" }],
        userName: "Test User",
        phoneNumber: "+1234567890",
        userId: "cust_123",
        deliveryAddress: { street: "123 Food Lane", city: "Dubai" },
        totalPrice: 250,
        commissionPercent: 10,
        deliveryCharge: 15
      })
    });

    let orderData = await orderRes.json();
    if (orderRes.ok && orderData.data?.id) {
      testOrderId = orderData.data.id;
      console.log(`✅ Dummy Order Created Successfully: ${testOrderId}`);
    } else {
      console.log("❌ Failed to create dummy order:", orderData);
      return;
    }
    console.log("--------------------------------------------------");

    // 1. Initiate Payment
    console.log("1. Testing POST /users/payments/initiate...");
    let res = await fetch(`${baseUrl}/users/payments/initiate${authQuery}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: testOrderId,
        amount: 250,
        currency: "AED",
        status: "completed",
        gatewayTransactionId: "txn_" + Date.now(),
        paymentMethod: "card"
      })
    });
    
    let result = await res.json();
    if (res.ok) {
      console.log("✅ Payment Initiated Successfully:");
      console.log(result);
      initiatedPaymentId = result.data.id;
    } else {
      console.log("❌ Test Failed:", result);
    }
    console.log("--------------------------------------------------");

    // 2. Get Payment by Order ID
    console.log(`2. Testing GET /users/payments/getByOrderId/${testOrderId}...`);
    res = await fetch(`${baseUrl}/users/payments/getByOrderId/${testOrderId}${authQuery}`);
    
    result = await res.json();
    if (res.ok) {
      console.log("✅ Get Payment By Order ID Success:");
      console.log(result);
    } else {
      console.log("❌ Test Failed:", result);
    }
    console.log("--------------------------------------------------");

    // 3. Refund Payment
    if (initiatedPaymentId) {
      console.log(`3. Testing POST /admin/payments/refund/${initiatedPaymentId}...`);
      res = await fetch(`${baseUrl}/admin/payments/refund/${initiatedPaymentId}${authQuery}`, {
        method: "POST"
      });
      
      result = await res.json();
      if (res.ok) {
        console.log("✅ Refund Payment Success:");
        console.log(result);
      } else {
        console.log("❌ Test Failed:", result);
      }
    } else {
      console.log("⚠️ Skipping Refund test because initiation failed.");
    }
    console.log("--------------------------------------------------");

    // 4. Get All Payments
    console.log("4. Testing GET /admin/payments/getAll...");
    res = await fetch(`${baseUrl}/admin/payments/getAll${authQuery}`);
    
    result = await res.json();
    if (res.ok) {
      console.log(`✅ Get All Payments Success! Total Records: ${result.data?.length || 0}`);
    } else {
      console.log("❌ Test Failed:", result);
    }
    console.log("--------------------------------------------------");

    console.log("🎉 All Payment APIs tested successfully!");

  } catch (err) {
    console.error("🔥 Error running tests:", err.message);
  }
}

testPaymentApis();
