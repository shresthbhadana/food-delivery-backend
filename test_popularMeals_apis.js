const baseUrl = "http://127.0.0.1:3000";
const authQuery = "?testUid=test_admin_123";

async function testPopularMealsApis() {
  console.log("🚀 Starting Popular Meals API Tests...\n");

  try {
    // 1. Rebuild Popular Meals (Admin)
    console.log("1. Testing POST /popular_meals-api/popularMeals...");
    let res = await fetch(`${baseUrl}/popular_meals-api/popularMeals${authQuery}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });
    
    let result = await res.json();
    if (res.ok) {
      console.log("✅ Rebuild Success:");
      console.log(result);
    } else {
      console.log("❌ Test Failed:", result);
    }
    console.log("--------------------------------------------------");

    // 2. Get Popular Meals (Customer)
    console.log("2. Testing GET /users/meals/getPopularMeals...");
    res = await fetch(`${baseUrl}/users/meals/getPopularMeals?testUid=customer_123`);
    
    result = await res.json();
    if (res.ok) {
      console.log("✅ Get Popular Meals Success:");
      console.log(result);
    } else {
      console.log("❌ Test Failed:", result);
    }

  } catch (err) {
    console.error("🔥 Error running tests:", err.message);
  }
}

testPopularMealsApis();
