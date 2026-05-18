const assert = require("assert");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const db = require("./models/index");
const baseUrl = "http://localhost:3000";
const testUid = "test-user-001";
const authQuery = (url) => `${url}${url.includes("?") ? "&" : "?"}testUid=${testUid}`;

async function testNotificationApis() {
  console.log("\n🚀 Starting Notification API Tests...\n");

  const notifications = [
    {
      id: `notif-${Date.now()}-1`,
      userId: testUid,
      title: "Test Notification 1",
      body: "This is a test notification.",
      status: "NEW",
      createdAt: Date.now(),
    },
    {
      id: `notif-${Date.now()}-2`,
      userId: testUid,
      title: "Test Notification 2",
      body: "This is another test notification.",
      status: "NEW",
      createdAt: Date.now() + 1000,
    },
  ];

  try {
    await db.Notification.bulkCreate(notifications);
    console.log(`✅ Created ${notifications.length} test notifications\n`);

    console.log("1. Testing GET /users/notifications/getAll...");
    let res = await fetch(authQuery(`${baseUrl}/users/notifications/getAll`));
    let data = await res.json();
    assert.strictEqual(data.success, true, `GetAll failed: ${JSON.stringify(data)}`);
    assert(Array.isArray(data.data), "Expected data.data to be an array");
    assert(data.data.length >= 2, "Expected at least 2 notifications");
    console.log(`✅ Retrieved ${data.data.length} notifications\n`);

    console.log("2. Testing PUT /users/notifications/markNotificationAsRead...");
    res = await fetch(authQuery(`${baseUrl}/users/notifications/markNotificationAsRead`), {
      method: "PUT",
    });
    data = await res.json();
    assert.strictEqual(data.success, true, `MarkAsRead failed: ${JSON.stringify(data)}`);
    console.log("✅ Notifications marked as read\n");

    console.log("3. Verifying notifications are read...");
    res = await fetch(authQuery(`${baseUrl}/users/notifications/getAll`));
    data = await res.json();
    assert.strictEqual(data.success, true, `Verify read failed: ${JSON.stringify(data)}`);
    assert(data.data.every((n) => n.isRead === 1 || n.isRead === true), "Expected all notifications to be read");
    console.log("✅ All notifications are marked as read\n");

    console.log("4. Testing DELETE /users/notifications/deleteAll...");
    res = await fetch(authQuery(`${baseUrl}/users/notifications/deleteAll`), {
      method: "DELETE",
    });
    data = await res.json();
    assert.strictEqual(data.success, true, `DeleteAll failed: ${JSON.stringify(data)}`);
    console.log("✅ Notifications deleted successfully\n");

    console.log("5. Verifying notifications are deleted...");
    res = await fetch(authQuery(`${baseUrl}/users/notifications/getAll`));
    data = await res.json();
    assert.strictEqual(data.success, true, `Verify delete failed: ${JSON.stringify(data)}`);
    assert(Array.isArray(data.data), "Expected data.data to be an array");
    assert(data.data.length === 0, "Expected zero notifications after delete");
    console.log("✅ No notifications remain\n");

    console.log("🎉 All Notification API tests passed!");
  } catch (error) {
    console.error("❌ Notification API test failed:", error.message);
    process.exit(1);
  } finally {
    await db.Notification.destroy({ where: { userId: testUid } }).catch(() => {});
  }
}

testNotificationApis();
