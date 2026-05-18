const assert = require('assert');

async function testAppVersionApis() {
  console.log("🚀 Starting App Version API Tests...\n");
  const baseUrl = "http://127.0.0.1:3000";
  // Bypassing authMiddleware using testUid
  const authQuery = "?testUid=test_user_123";
  const adminAuthQuery = "?testUid=test_admin_123";

  try {
    // 1. Record User App Version
    console.log("1. Testing POST /users/version/addUserAppVersion...");
    let res = await fetch(`${baseUrl}/users/version/addUserAppVersion${authQuery}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        appVersion: "v1.2.0"
      })
    });
    let data = await res.json();
    assert.strictEqual(data.success, true, `Expected success, got: ${JSON.stringify(data)}`);
    console.log(`✅ App Version recorded successfully!\n`);

    // 1b. Test Duplicate Record (Should be ignored and return success without data crash)
    console.log("1b. Testing Duplicate POST /users/version/addUserAppVersion...");
    let duplicateRes = await fetch(`${baseUrl}/users/version/addUserAppVersion${authQuery}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        appVersion: "v1.2.0" // Same version
      })
    });
    let duplicateData = await duplicateRes.json();
    assert.strictEqual(duplicateData.success, true, `Expected success, got: ${JSON.stringify(duplicateData)}`);
    console.log(`✅ Duplicate App Version ignored properly!\n`);

    // 2. Get All App Versions (Admin)
    console.log("2. Testing GET /admin/versions/getAll...");
    res = await fetch(`${baseUrl}/admin/versions/getAll${adminAuthQuery}`);
    data = await res.json();
    assert.strictEqual(data.success, true, `Expected success, got: ${JSON.stringify(data)}`);
    assert(Array.isArray(data.data), "Data should be an array");
    console.log(`✅ Fetched All App Versions successfully! Total records: ${data.data.length}\n`);

    console.log("🎉 All App Version APIs tested successfully!");
  } catch (error) {
    console.error("❌ Test Failed:", error);
  }
}

testAppVersionApis();
