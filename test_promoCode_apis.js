const assert = require("assert");

const baseUrl = "http://localhost:3000";
const testAdminUid = "test-admin-001";
const authQuery = (url) => `${url}${url.includes("?") ? "&" : "?"}testUid=${testAdminUid}`;

async function testPromoCodeApis() {
  console.log("\n🚀 Starting Promo Code API Tests...\n");

  let promoCodeId = null;

  try {
    console.log("1. Testing POST /admin/addPromoCodeAndDiscounts...");

    const createRes = await fetch(authQuery(`${baseUrl}/admin/addPromoCodeAndDiscounts`), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: `PROMO-${Date.now()}`,
        description: "Test promo code",
        discountType: "percentage",
        discountValue: 15,
        expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
        conditions: { minQuantity: 1 },
        minPrice: 100,
        status: "Active",
      }),
    });

    let data = await createRes.json();
    assert.strictEqual(data.success, true, `Create failed: ${JSON.stringify(data)}`);
    promoCodeId = data.data.id;
    console.log(`✅ Promo code created: ${promoCodeId}\n`);

    console.log("2. Testing GET /admin/getAllPromoCodeAndDiscounts...");
    let res = await fetch(authQuery(`${baseUrl}/admin/getAllPromoCodeAndDiscounts`));
    data = await res.json();
    assert.strictEqual(data.success, true, `Get all failed: ${JSON.stringify(data)}`);
    assert(Array.isArray(data.data), "Expected data.data to be an array");
    console.log(`✅ Admin list returned ${data.data.length} items\n`);

    console.log(`3. Testing GET /admin/getPromoCodeById/${promoCodeId}...`);
    res = await fetch(authQuery(`${baseUrl}/admin/getPromoCodeById/${promoCodeId}`));
    data = await res.json();
    assert.strictEqual(data.success, true, `Get by ID failed: ${JSON.stringify(data)}`);
    assert.strictEqual(data.data.id, promoCodeId);
    console.log("✅ Promo code fetched by ID\n");

    console.log(`4. Testing PUT /admin/updatePromoCodeAndDiscount/${promoCodeId}...`);
    res = await fetch(authQuery(`${baseUrl}/admin/updatePromoCodeAndDiscount/${promoCodeId}`), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: "Updated promo code description",
        discountType: "flat",
        discountValue: 20,
        expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
        conditions: { minQuantity: 2 },
        minPrice: 200,
        status: "Active",
      }),
    });
    data = await res.json();
    assert.strictEqual(data.success, true, `Update failed: ${JSON.stringify(data)}`);
    assert.strictEqual(data.data.discountType, "flat");
    console.log("✅ Promo code updated\n");

    console.log("5. Testing GET /users/promocode/getAllPromoCodes...");
    res = await fetch(authQuery(`${baseUrl}/users/promocode/getAllPromoCodes`));
    data = await res.json();
    assert.strictEqual(data.success, true, `Get active failed: ${JSON.stringify(data)}`);
    assert(Array.isArray(data.data), "Expected data.data to be an array");
    console.log(`✅ Active promo codes returned: ${data.data.length}\n`);

    console.log(`6. Testing GET /users/promocode/getPromoCodeById/${promoCodeId}...`);
    res = await fetch(authQuery(`${baseUrl}/users/promocode/getPromoCodeById/${promoCodeId}`));
    data = await res.json();
    assert.strictEqual(data.success, true, `Get promo code by ID failed: ${JSON.stringify(data)}`);
    assert.strictEqual(data.data.id, promoCodeId);
    console.log("✅ User promo code fetched by ID\n");

    console.log(`7. Testing DELETE /admin/deletePromoCodeById/${promoCodeId}...`);
    res = await fetch(authQuery(`${baseUrl}/admin/deletePromoCodeById/${promoCodeId}`), {
      method: "DELETE",
    });
    data = await res.json();
    assert.strictEqual(data.success, true, `Delete failed: ${JSON.stringify(data)}`);
    console.log("✅ Promo code deleted\n");

    console.log("🎉 All Promo Code API tests passed!");
  } catch (error) {
    console.error("❌ Promo Code API test failed:", error.message);
    if (promoCodeId) {
      await fetch(authQuery(`${baseUrl}/admin/deletePromoCodeById/${promoCodeId}`), { method: "DELETE" }).catch(() => {});
    }
    process.exit(1);
  }
}

testPromoCodeApis();
