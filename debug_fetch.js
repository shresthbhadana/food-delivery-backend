async function run() {
  const res = await fetch("http://127.0.0.1:3000/users/version/addUserAppVersion?testUid=test_user_123", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ appVersion: "1.0.0" })
  });
  const text = await res.text();
  console.log("STATUS:", res.status);
  console.log("BODY:", text);
}
run();
