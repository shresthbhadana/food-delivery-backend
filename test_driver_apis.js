const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const assert = require("assert");
const db = require("./models/index");

const baseUrl = "http://localhost:3000";
const testUid = "test-admin-driver";
const authQuery = (url) => `${url}${url.includes("?") ? "&" : "?"}testUid=${testUid}`;

async function testDriverAPIs() {
  console.log("\n🚀 Starting Driver API Tests...\n");

  let driverId = null;
  let createdDriver = null;

  try {
    driverId = `driver-test-${Date.now()}`;

    createdDriver = await db.Driver.create({
      id: driverId,
      location: { lat: 12.9716, lng: 77.5946 },
      fcmToken: ["token-1"],
      isOnline: false,
      vehicleType: "bike",
      vehicleNumber: "TEST-DR-001",
    });

    console.log(`✅ Test driver created: ${driverId}\n`);

    console.log("1. Testing GET /admin/drivers/getAll...");
    let res = await fetch(authQuery(`${baseUrl}/admin/drivers/getAll`));
    const status = res.status;
    const text = await res.text();
    console.log(`DEBUG getAll status=${status}`);
    console.log(`DEBUG getAll body=${text.slice(0,1000)}`);
    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      throw new Error(`Expected JSON response but got: ${text}`);
    }
    assert.strictEqual(data.success, true, `GetAll failed: ${JSON.stringify(data)}`);
    assert(Array.isArray(data.data), "Expected data.data to be an array");
    console.log(`✅ Got ${data.data.length} drivers\n`);

    console.log(`2. Testing GET /admin/drivers/getById/${driverId}...`);
    res = await fetch(authQuery(`${baseUrl}/admin/drivers/getById/${driverId}`));
    data = await res.json();
    assert.strictEqual(data.success, true, `GetById failed: ${JSON.stringify(data)}`);
    assert.strictEqual(data.data.id, driverId);
    console.log("✅ Driver fetched by ID\n");

    console.log(`3. Testing PUT /admin/drivers/update/${driverId}...`);
    res = await fetch(authQuery(`${baseUrl}/admin/drivers/update/${driverId}`), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location: { lat: 13.0358, lng: 77.5970 },
        isOnline: true,
        vehicleType: "scooter",
        vehicleNumber: "UPDATED-DR-001",
      }),
    });
    data = await res.json();
    assert.strictEqual(data.success, true, `Update failed: ${JSON.stringify(data)}`);
    assert.strictEqual(data.data.vehicleType, "scooter");
    assert.strictEqual(data.data.vehicleNumber, "UPDATED-DR-001");
    console.log("✅ Driver updated successfully\n");

    console.log(`4. Testing PUT /driver/setOnlineStatus/${driverId}...`);
    res = await fetch(authQuery(`${baseUrl}/driver/setOnlineStatus/${driverId}`), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isOnline: false }),
    });
    data = await res.json();
    assert.strictEqual(data.success, true, `SetOnlineStatus failed: ${JSON.stringify(data)}`);
    console.log("✅ Driver online status updated\n");

    console.log(`5. Testing DELETE /admin/drivers/delete/${driverId}...`);
    res = await fetch(authQuery(`${baseUrl}/admin/drivers/delete/${driverId}`), {
      method: "DELETE",
    });
    data = await res.json();
    assert.strictEqual(data.success, true, `Delete failed: ${JSON.stringify(data)}`);
    console.log("✅ Driver deleted successfully\n");

    console.log("🎉 All Driver API tests passed successfully!");
  } catch (error) {
    console.error("❌ Driver API test failed:", error.message);
    if (driverId) {
      await db.Driver.destroy({ where: { id: driverId } }).catch(() => {});
    }
    process.exit(1);
  } finally {
    if (createdDriver && createdDriver.id) {
      await db.Driver.destroy({ where: { id: createdDriver.id } }).catch(() => {});
    }
  }
}

testDriverAPIs();
