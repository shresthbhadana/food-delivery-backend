const assert = require("assert");

async function testDispatcherAPIs() {

  console.log(
    "\n🚀 Starting Dispatcher API Tests...\n"
  );

  const baseUrl =
    "http://localhost:3000";

  const testAdminId =
    "YOUR_ADMIN_UID";

  const headers = {
    "Content-Type":
      "application/json",
  };

  let dispatcherId = null;

  try {

    console.log(
      "1️⃣ Testing POST /admin/addSubAdmin..."
    );

    const createPayload = {

      email:
        `dispatcher-${Date.now()}@test.com`,

      password:
        "SecurePassword123!",

      name:
        "Test Dispatcher",

      permissions: {

        can_manage_orders:
          true,

        can_view_analytics:
          true,

        can_assign_drivers:
          false,

        can_manage_complaints:
          true,
      },
    };

    let res = await fetch(

      `${baseUrl}/admin/addSubAdmin?testUid=${testAdminId}&testMode=true`,

      {
        method: "POST",

        headers,

        body: JSON.stringify(
          createPayload
        ),
      }
    );

    let data = await res.json();

    assert.strictEqual(
      data.success,
      true,
      `Expected success, got: ${JSON.stringify(data)}`
    );

    dispatcherId =
      data.data.user_id;

    console.log(
      `✅ Dispatcher Created: ${dispatcherId}\n`
    );

    console.log(
      "2️⃣ Testing GET /admin/getSubAdminById/:id..."
    );

    res = await fetch(

      `${baseUrl}/admin/getSubAdminById/${dispatcherId}?testUid=${testAdminId}`,

      {
        method: "GET",
        headers,
      }
    );

    data = await res.json();

    assert.strictEqual(
      data.success,
      true
    );

    assert(
      data.data.dispatcher
    );

    assert(
      data.data.userProfile
    );

    console.log(
      "✅ Dispatcher fetched successfully\n"
    );

    console.log(
      "3️⃣ Testing GET /admin/getAllSubAdmins..."
    );

    res = await fetch(

      `${baseUrl}/admin/getAllSubAdmins?limit=5&offset=0&testUid=${testAdminId}`,

      {
        method: "GET",
        headers,
      }
    );

    data = await res.json();

    assert.strictEqual(
      data.success,
      true
    );

    assert(
      Array.isArray(data.data)
    );

    console.log(
      "✅ All dispatchers fetched\n"
    );

    console.log(
      "4️⃣ Testing PUT /admin/updatePermissions/:id..."
    );

    const newPermissions = {

      can_manage_orders:
        true,

      can_view_analytics:
        false,

      can_assign_drivers:
        true,

      can_manage_complaints:
        false,
    };

    res = await fetch(

      `${baseUrl}/admin/updatePermissions/${dispatcherId}?testUid=${testAdminId}&testMode=true`,

      {
        method: "PUT",

        headers,

        body: JSON.stringify({
          permissions:
            newPermissions,
        }),
      }
    );

    data = await res.json();

    assert.strictEqual(
      data.success,
      true
    );

    console.log(
      "✅ Permissions updated\n"
    );

    console.log(
      "5️⃣ Testing PUT /admin/updateUserAndPermissions/:id..."
    );

    const updatePayload = {

      name:
        "Updated Dispatcher",

      email:
        `updated-${Date.now()}@test.com`,

      permissions: {

        can_manage_orders:
          true,

        can_view_analytics:
          true,

        can_assign_drivers:
          true,
      },
    };

    res = await fetch(

      `${baseUrl}/admin/updateUserAndPermissions/${dispatcherId}?testUid=${testAdminId}&testMode=true`,

      {
        method: "PUT",

        headers,

        body: JSON.stringify(
          updatePayload
        ),
      }
    );

    data = await res.json();

    assert.strictEqual(
      data.success,
      true
    );

    console.log(
      "✅ User & permissions updated\n"
    );

    console.log(
      "6️⃣ Verifying update..."
    );

    res = await fetch(

      `${baseUrl}/admin/getSubAdminById/${dispatcherId}?testUid=${testAdminId}`,

      {
        method: "GET",
        headers,
      }
    );

    data = await res.json();

    assert.strictEqual(
      data.data.userProfile.name,
      updatePayload.name
    );

    console.log(
      "✅ Update verified\n"
    );

    console.log(
      "7️⃣ Testing DELETE /admin/deleteSubAdminById/:id..."
    );

    res = await fetch(

      `${baseUrl}/admin/deleteSubAdminById/${dispatcherId}?testUid=${testAdminId}&testMode=true`,

      {
        method: "DELETE",
        headers,
      }
    );

    data = await res.json();

    assert.strictEqual(
      data.success,
      true
    );

    console.log(
      "✅ Dispatcher deleted\n"
    );

    console.log(
      "8️⃣ Verifying deletion..."
    );

    res = await fetch(

      `${baseUrl}/admin/getSubAdminById/${dispatcherId}?testUid=${testAdminId}`,

      {
        method: "GET",
        headers,
      }
    );

    data = await res.json();

    assert.strictEqual(
      data.success,
      false
    );

    console.log(
      "✅ Deletion verified\n"
    );

    console.log(
      "═".repeat(50)
    );

    console.log(
      "✅ ALL TESTS PASSED 🎉"
    );

    console.log(
      "═".repeat(50)
    );

  } catch (error) {

    console.error(
      "\n❌ TEST FAILED!"
    );

    console.error(
      error.message
    );

    console.error(error);

    process.exit(1);
  }
}

testDispatcherAPIs();