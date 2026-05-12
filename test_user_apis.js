const assert = require('assert');

async function testUserApis() {
  console.log("🚀 Starting User API Tests...\n");
  const baseUrl = "http://localhost:3000";
  let subAdminId;

  try {
    // 1. Add Sub-Admin
    console.log("1. Testing POST /admin/addSubAdmin...");
    let res = await fetch(`${baseUrl}/admin/addSubAdmin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: "subadmin@test.com", password: "password123", name: "Test Admin" })
    });
    let data = await res.json();
    assert.strictEqual(data.success, true, `Expected success, got: ${JSON.stringify(data)}`);
    subAdminId = data.data.id;
    console.log(`✅ Sub-Admin created successfully! ID: ${subAdminId}\n`);

    // 2. Get Sub-Admin
    console.log(`2. Testing GET /admin/getSubAdminById/${subAdminId}...`);
    res = await fetch(`${baseUrl}/admin/getSubAdminById/${subAdminId}`);
    data = await res.json();
    assert.strictEqual(data.success, true, `Expected success, got: ${JSON.stringify(data)}`);
    console.log("✅ Fetched Sub-Admin successfully!\n");

    // 3. Update User And Permissions
    console.log(`3. Testing PUT /admin/updateUserAndPermissions...`);
    res = await fetch(`${baseUrl}/admin/updateUserAndPermissions`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: subAdminId, permissions: { canEditMenu: true } })
    });
    data = await res.json();
    assert.strictEqual(data.success, true, `Expected success, got: ${JSON.stringify(data)}`);
    console.log("✅ Updated Sub-Admin Permissions successfully!\n");

    // 4. Admin Get All Users
    console.log("4. Testing GET /admin/users/getAll...");
    res = await fetch(`${baseUrl}/admin/users/getAll?role=admin`);
    data = await res.json();
    assert.strictEqual(data.success, true, `Expected success, got: ${JSON.stringify(data)}`);
    assert(data.total >= 1);
    console.log(`✅ Admin Fetched All Users successfully! Count: ${data.total}\n`);

    // 5. Admin Get User By ID
    console.log(`5. Testing GET /admin/users/getById/${subAdminId}...`);
    res = await fetch(`${baseUrl}/admin/users/getById/${subAdminId}`);
    data = await res.json();
    assert.strictEqual(data.success, true, `Expected success, got: ${JSON.stringify(data)}`);
    console.log("✅ Admin Fetched User by ID successfully!\n");

    // 6. Admin Update User
    console.log("6. Testing PUT /admin/users/update...");
    res = await fetch(`${baseUrl}/admin/users/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: subAdminId, name: "Updated Admin Name" })
    });
    data = await res.json();
    assert.strictEqual(data.success, true, `Expected success, got: ${JSON.stringify(data)}`);
    console.log("✅ Admin Updated User successfully!\n");

    // 7. Disable User
    console.log("7. Testing PUT /admin/disableEnableUserAccount...");
    res = await fetch(`${baseUrl}/admin/disableEnableUserAccount`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: subAdminId, isDisabled: true })
    });
    data = await res.json();
    assert.strictEqual(data.success, true, `Expected success, got: ${JSON.stringify(data)}`);
    console.log("✅ Disabled User successfully!\n");

    // 8. Delete Sub Admin
    console.log(`8. Testing DELETE /admin/deleteSubAdminById/${subAdminId}...`);
    res = await fetch(`${baseUrl}/admin/deleteSubAdminById/${subAdminId}`, { method: 'DELETE' });
    data = await res.json();
    assert.strictEqual(data.success, true, `Expected success, got: ${JSON.stringify(data)}`);
    console.log("✅ Deleted Sub-Admin successfully!\n");

    console.log("🎉 All 8 User APIs tested successfully!");
  } catch (error) {
    console.error("❌ Test Failed:", error);
  }
}

testUserApis();
