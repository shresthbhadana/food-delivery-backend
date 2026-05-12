const assert = require('assert');

// Auth: testUid query param gives admin access (from authMiddleware)
// For admin+vendor routes we use the same testUid
const ADMIN_UID = 'test-admin-001';
const baseUrl = 'http://localhost:3000';

// Helper: add testUid to URL
const withAuth = (url) => `${url}${url.includes('?') ? '&' : '?'}testUid=${ADMIN_UID}`;

async function testRestroApis() {
  console.log('🚀 Starting Restaurant API Tests...\n');

  let restaurantId;

  try {

    // ────────────────────────────────────────────────────────────────────────
    // 1. CREATE restaurant
    // ────────────────────────────────────────────────────────────────────────
    console.log('1. Testing POST /admin/restaurants/create...');
    let res = await fetch(withAuth(`${baseUrl}/admin/restaurants/create`), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        restaurantName: 'Test Burger Joint',
        vendorId: 'vendor-test-001',
        location: 'Sector 5, Noida',
        isOpen: true,
        isFeatured: false,
      }),
    });
    let data = await res.json();
    assert.strictEqual(data.success, true, `Create failed: ${JSON.stringify(data)}`);
    restaurantId = data.data.id;
    console.log(`✅ Restaurant created! ID: ${restaurantId}\n`);

    // ────────────────────────────────────────────────────────────────────────
    // 2. ADMIN GET ALL restaurants
    // ────────────────────────────────────────────────────────────────────────
    console.log('2. Testing GET /admin/restaurants/getAll...');
    res = await fetch(withAuth(`${baseUrl}/admin/restaurants/getAll`));
    data = await res.json();
    assert.strictEqual(data.success, true, `GetAll failed: ${JSON.stringify(data)}`);
    assert(Array.isArray(data.data), 'data.data should be an array');
    assert(data.data.length >= 1, 'Should have at least 1 restaurant');
    console.log(`✅ Fetched all restaurants! Count: ${data.data.length}\n`);

    // ────────────────────────────────────────────────────────────────────────
    // 3. ADMIN GET BY ID
    // ────────────────────────────────────────────────────────────────────────
    console.log(`3. Testing GET /admin/restaurants/getById/${restaurantId}...`);
    res = await fetch(withAuth(`${baseUrl}/admin/restaurants/getById/${restaurantId}`));
    data = await res.json();
    assert.strictEqual(data.success, true, `GetById failed: ${JSON.stringify(data)}`);
    assert.strictEqual(data.data.id, restaurantId);
    assert.strictEqual(data.data.restaurantName, 'Test Burger Joint');
    console.log(`✅ Fetched restaurant by ID!\n`);

    // ────────────────────────────────────────────────────────────────────────
    // 4. UPDATE restaurant
    // ────────────────────────────────────────────────────────────────────────
    console.log(`4. Testing PUT /admin/restaurants/update/${restaurantId}...`);
    res = await fetch(withAuth(`${baseUrl}/admin/restaurants/update/${restaurantId}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        restaurantName: 'Updated Burger Joint',
        location: 'Sector 18, Noida',
        isFeatured: true,
      }),
    });
    data = await res.json();
    assert.strictEqual(data.success, true, `Update failed: ${JSON.stringify(data)}`);
    console.log(`✅ Restaurant updated!\n`);

    // ────────────────────────────────────────────────────────────────────────
    // 5. TOGGLE STATUS (close restaurant) — admin/vendor
    // ────────────────────────────────────────────────────────────────────────
    console.log(`5. Testing PUT /admin/restaurants/toggleStatus/${restaurantId}...`);
    res = await fetch(withAuth(`${baseUrl}/admin/restaurants/toggleStatus/${restaurantId}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isOpen: false }),
    });
    data = await res.json();
    assert.strictEqual(data.success, true, `ToggleStatus failed: ${JSON.stringify(data)}`);
    console.log(`✅ Restaurant status toggled to CLOSED!\n`);

    // ────────────────────────────────────────────────────────────────────────
    // 6. BULK OPEN/CLOSE ALL — reopen for user tests
    // ────────────────────────────────────────────────────────────────────────
    console.log('6. Testing PUT /admin/openAndCloseAllRestaurants...');
    res = await fetch(withAuth(`${baseUrl}/admin/openAndCloseAllRestaurants`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isOpen: true }),
    });
    data = await res.json();
    assert.strictEqual(data.success, true, `BulkToggle failed: ${JSON.stringify(data)}`);
    console.log(`✅ All restaurants opened!\n`);

    // ────────────────────────────────────────────────────────────────────────
    // 7. USER GET ALL OPEN restaurants
    // ────────────────────────────────────────────────────────────────────────
    console.log('7. Testing GET /users/restaurants/getAll (customer)...');
    res = await fetch(withAuth(`${baseUrl}/users/restaurants/getAll`));
    data = await res.json();
    assert.strictEqual(data.success, true, `UserGetAll failed: ${JSON.stringify(data)}`);
    assert(Array.isArray(data.data), 'data.data should be an array');
    assert(data.data.length >= 1, 'Should have at least 1 open restaurant');
    // All returned should be open
    data.data.forEach(r => {
      assert.strictEqual(r.isOpen, true, `Restaurant ${r.id} should be open`);
    });
    console.log(`✅ Customer fetched open restaurants! Count: ${data.data.length}\n`);

    // ────────────────────────────────────────────────────────────────────────
    // 8. USER GET BY ID
    // ────────────────────────────────────────────────────────────────────────
    console.log(`8. Testing GET /users/restaurants/getById/${restaurantId}...`);
    res = await fetch(withAuth(`${baseUrl}/users/restaurants/getById/${restaurantId}`));
    data = await res.json();
    assert.strictEqual(data.success, true, `UserGetById failed: ${JSON.stringify(data)}`);
    assert.strictEqual(data.data.id, restaurantId);
    console.log(`✅ Customer fetched restaurant detail!\n`);

    // ────────────────────────────────────────────────────────────────────────
    // 9. DELETE restaurant
    // ────────────────────────────────────────────────────────────────────────
    console.log(`9. Testing DELETE /admin/restaurants/delete/${restaurantId}...`);
    res = await fetch(withAuth(`${baseUrl}/admin/restaurants/delete/${restaurantId}`), {
      method: 'DELETE',
    });
    data = await res.json();
    assert.strictEqual(data.success, true, `Delete failed: ${JSON.stringify(data)}`);
    console.log(`✅ Restaurant deleted!\n`);

    // Verify deletion - should 404
    console.log('   Verifying deletion (should return 404)...');
    res = await fetch(withAuth(`${baseUrl}/admin/restaurants/getById/${restaurantId}`));
    data = await res.json();
    assert.strictEqual(res.status, 404, `Expected 404 after delete, got: ${res.status}`);
    console.log('✅ Confirmed: restaurant no longer exists\n');

    console.log('🎉 All 9 Restaurant APIs tested successfully!');

  } catch (error) {
    console.error('❌ Test Failed:', error.message);
    if (restaurantId) {
      console.log(`⚠️  Cleanup: attempting to delete restaurant ${restaurantId}...`);
      await fetch(withAuth(`${baseUrl}/admin/restaurants/delete/${restaurantId}`), { method: 'DELETE' }).catch(() => {});
    }
    process.exit(1);
  }
}

testRestroApis();
