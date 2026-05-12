const assert = require('assert');

const ADMIN_UID = 'test-admin-001';
const baseUrl = 'http://localhost:3000';
const withAuth = (url) => `${url}${url.includes('?') ? '&' : '?'}testUid=${ADMIN_UID}`;

async function testProductApis() {
  console.log('🚀 Starting Product API Tests...\n');

  let productId;
  let reviewId;
  let restaurantId;

  try {

    // ────────────────────────────────────────────────────────────────────────
    // 0. CREATE restaurant first
    // ────────────────────────────────────────────────────────────────────────
    console.log('0. Setting up: Creating test restaurant...');
    let res = await fetch(withAuth(`${baseUrl}/admin/restaurants/create`), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        restaurantName: 'Test Restaurant',
        name: 'Test Restaurant',
        description: 'A delicious test restaurant',
        address: '123 Test St',
        city: 'TestCity',
        zipCode: '12345',
        phone: '1234567890',
        cuisines: ['Indian'],
        vendorId: 'vendor-test-001',
        status: 'OPEN',
        rating: 4.5,
      }),
    });
    let data = await res.json();
    restaurantId = data.data?.id;
    if (!restaurantId) {
      throw new Error(`Restaurant creation failed: ${JSON.stringify(data)}`);
    }
    console.log(`✅ Test restaurant created! ID: ${restaurantId}\n`);

    // ────────────────────────────────────────────────────────────────────────
    // 1. CREATE product
    // ────────────────────────────────────────────────────────────────────────
    console.log('1. Testing POST /admin/products/create...');
    res = await fetch(withAuth(`${baseUrl}/admin/products/create`), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Veg Burger',
        description: 'A delicious test burger',
        restaurantId: restaurantId,
        restaurantName: 'Test Restaurant',
        vendorId: 'vendor-test-001',
        vendorPrice: 80,
        price: 120,
        isAvailable: true,
        isFeatured: false,
        spiciness: 2,
        cuisines: ['Indian'],
        categories: ['Burger'],
        variants: [],
      }),
    });
    data = await res.json();
    assert.strictEqual(data.success, true, `Create product failed: ${JSON.stringify(data)}`);
    productId = data.data.id;
    console.log(`✅ Product created! ID: ${productId}\n`);

    // ────────────────────────────────────────────────────────────────────────
    // 2. ADMIN GET ALL products
    // ────────────────────────────────────────────────────────────────────────
    console.log('2. Testing GET /admin/products/getAll...');
    res = await fetch(withAuth(`${baseUrl}/admin/products/getAll`));
    data = await res.json();
    assert.strictEqual(data.success, true, `GetAll failed: ${JSON.stringify(data)}`);
    assert(Array.isArray(data.data), 'data.data should be array');
    assert(data.data.length >= 1, 'Should have at least 1 product');
    console.log(`✅ Fetched all products! Count: ${data.data.length}\n`);

    // ────────────────────────────────────────────────────────────────────────
    // 3. ADMIN GET BY ID
    // ────────────────────────────────────────────────────────────────────────
    console.log(`3. Testing GET /admin/products/getById/${productId}...`);
    res = await fetch(withAuth(`${baseUrl}/admin/products/getById/${productId}`));
    data = await res.json();
    assert.strictEqual(data.success, true, `GetById failed: ${JSON.stringify(data)}`);
    assert.strictEqual(data.data.id, productId);
    assert.strictEqual(data.data.name, 'Test Veg Burger');
    console.log(`✅ Fetched product by ID!\n`);

    // ────────────────────────────────────────────────────────────────────────
    // 4. UPDATE product
    // ────────────────────────────────────────────────────────────────────────
    console.log(`4. Testing PUT /admin/products/update/${productId}...`);
    res = await fetch(withAuth(`${baseUrl}/admin/products/update/${productId}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Updated Veg Burger',
        price: 150,
        isFeatured: true,
      }),
    });
    data = await res.json();
    assert.strictEqual(data.success, true, `Update failed: ${JSON.stringify(data)}`);
    assert.strictEqual(data.data.name, 'Updated Veg Burger');
    console.log(`✅ Product updated!\n`);

    // ────────────────────────────────────────────────────────────────────────
    // 5. USER GET ALL products
    // ────────────────────────────────────────────────────────────────────────
    console.log('5. Testing GET /users/products/getAll...');
    res = await fetch(withAuth(`${baseUrl}/users/products/getAll`));
    data = await res.json();
    assert.strictEqual(data.success, true, `UserGetAll failed: ${JSON.stringify(data)}`);
    assert(Array.isArray(data.data));
    console.log(`✅ User fetched all products! Count: ${data.data.length}\n`);

    // ────────────────────────────────────────────────────────────────────────
    // 6. USER GET BY ID
    // ────────────────────────────────────────────────────────────────────────
    console.log(`6. Testing GET /users/products/getById/${productId}...`);
    res = await fetch(withAuth(`${baseUrl}/users/products/getById/${productId}`));
    data = await res.json();
    assert.strictEqual(data.success, true, `UserGetById failed: ${JSON.stringify(data)}`);
    assert.strictEqual(data.data.id, productId);
    console.log(`✅ User fetched product by ID!\n`);

    // ────────────────────────────────────────────────────────────────────────
    // 7. ADD REVIEW
    // ────────────────────────────────────────────────────────────────────────
    console.log(`7. Testing POST /users/products/addReview/${productId}...`);
    res = await fetch(withAuth(`${baseUrl}/users/products/addReview/${productId}`), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: 'Test User',
        rating: 4.5,
        comment: 'Great burger, loved it!',
        userId: ADMIN_UID,
      }),
    });
    data = await res.json();
    assert.strictEqual(data.success, true, `AddReview failed: ${JSON.stringify(data)}`);
    reviewId = data.data.id;
    console.log(`✅ Review added! ID: ${reviewId}\n`);

    // ────────────────────────────────────────────────────────────────────────
    // 8. GET ALL REVIEWS BY PRODUCT ID
    // ────────────────────────────────────────────────────────────────────────
    console.log(`8. Testing GET /users/products/getAllReviewsByProductId/${productId}...`);
    res = await fetch(withAuth(`${baseUrl}/users/products/getAllReviewsByProductId/${productId}`));
    data = await res.json();
    assert.strictEqual(data.success, true, `GetReviews failed: ${JSON.stringify(data)}`);
    assert(Array.isArray(data.data));
    assert(data.data.length >= 1, 'Should have at least 1 review');
    console.log(`✅ Fetched all reviews! Count: ${data.data.length}\n`);

    // ────────────────────────────────────────────────────────────────────────
    // 9. DELETE REVIEW
    // ────────────────────────────────────────────────────────────────────────
    console.log(`9. Testing DELETE /admin/products/deleteReview/${reviewId}...`);
    res = await fetch(withAuth(`${baseUrl}/admin/products/deleteReview/${reviewId}`), {
      method: 'DELETE',
    });
    data = await res.json();
    assert.strictEqual(data.success, true, `DeleteReview failed: ${JSON.stringify(data)}`);
    console.log(`✅ Review deleted!\n`);

    // ────────────────────────────────────────────────────────────────────────
    // 10. DELETE product
    // ────────────────────────────────────────────────────────────────────────
    console.log(`10. Testing DELETE /admin/products/delete/${productId}...`);
    res = await fetch(withAuth(`${baseUrl}/admin/products/delete/${productId}`), {
      method: 'DELETE',
    });
    data = await res.json();
    assert.strictEqual(data.success, true, `Delete failed: ${JSON.stringify(data)}`);
    console.log(`✅ Product deleted!\n`);

    // ────────────────────────────────────────────────────────────────────────
    // 11. DELETE restaurant (cleanup)
    // ────────────────────────────────────────────────────────────────────────
    console.log(`11. Cleanup: Deleting test restaurant...`);
    res = await fetch(withAuth(`${baseUrl}/admin/restaurants/delete/${restaurantId}`), {
      method: 'DELETE',
    });
    data = await res.json();
    console.log(`✅ Restaurant deleted!\n`);

    console.log('🎉 All 11 Product APIs tested successfully!');

  } catch (error) {
    console.error('❌ Test Failed:', error.message);
    // Cleanup on failure
    if (reviewId) {
      await fetch(withAuth(`${baseUrl}/admin/products/deleteReview/${reviewId}`), { method: 'DELETE' }).catch(() => {});
    }
    if (productId) {
      await fetch(withAuth(`${baseUrl}/admin/products/delete/${productId}`), { method: 'DELETE' }).catch(() => {});
    }
    if (restaurantId) {
      await fetch(withAuth(`${baseUrl}/admin/restaurants/delete/${restaurantId}`), { method: 'DELETE' }).catch(() => {});
    }
    process.exit(1);
  }
}

testProductApis();
