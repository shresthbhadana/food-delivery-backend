# User Management Module Implementation Plan

## 1. Database Schema (MySQL + Sequelize)

### `models/userProfileModel.js`
Create the `UserProfile` model which maps to the `userProfilesNew` table.

**Fields:**
- `id` (STRING, Primary Key): Matches Firebase Auth UID.
- `name` (STRING): Display name.
- `email` (STRING): Email address.
- `roles` (JSON): e.g., `["admin"]`, `["vendor"]`, `["user"]`.
- `fcmToken` (JSON): Device push notification tokens.
- `isAnonymous` (BOOLEAN): Defaults to false.
- `permissions` (JSON): To store sub-admin permissions.
- `createdAt` (BIGINT): Epoch ms.
- `deleted` (BOOLEAN): Soft-delete flag, defaults to false.

**Composite Indexes:**
- `roles`, `name`
- `isAnonymous`, `roles`, `createdAt`
- `deleted`, `isAnonymous`, `roles`, `createdAt`

*Note: In MySQL, `roles` is a JSON array. Querying `array-contains` will use `JSON_CONTAINS()` under the hood.*

### `models/index.js`
Register the new model:
```javascript
db.userProfile = require("./userProfileModel")(sequelize, DataTypes);
```

---

## 2. Repository Layer

### `repository/userProfileRepo.js`
Create raw database queries for the `userProfilesNew` table.
- `createUserProfile(data)`
- `getUserProfileById(id)`
- `updateUserProfile(id, data)`
- `deleteUserProfile(id)`
- `getAllUserProfiles(filters)`

### `repository/index.js`
Export the new repository.

---

## 3. Service Layer (Business Logic & Firebase Auth)

### `services/userProfileService.js`
This layer will handle both the MySQL database updates and the Firebase Admin SDK calls (e.g., creating the Auth user, disabling the Auth user).

*Pre-requisite:* Install `firebase-admin` via `npm install firebase-admin` and configure your `serviceAccountKey.json`.

**Functions:**
1. `disableEnableUserAccount(uid, disabledStatus)` -> Updates Firebase Auth and MySQL `deleted` or status flag.
2. `deleteUserAccount(uid)` -> Deletes from Firebase Auth and soft-deletes in MySQL.
3. `addSubAdmin(data)` -> Creates user in Firebase Auth, then creates MySQL profile with `["admin"]` role and specific `permissions`.
4. `getSubAdminById(uid)` -> Fetches sub-admin profile from MySQL.
5. `deleteSubAdminById(uid)` -> Hard deletes from Firebase Auth and MySQL.
6. `updateUserAndPermissions(uid, data)` -> Updates MySQL profile and Firebase Auth profile.
7. `getAllUsers(roleFilter)` -> Fetches all users from MySQL filtering by `roles`.
8. `getUserById(uid)` -> Fetches single user from MySQL.
9. `updateUser(uid, data)` -> Updates any standard user profile in MySQL.

### `services/index.js`
Export the new service.

---

## 4. Controller Layer

### `controllers/userProfileController.js`
Create functions mapped to the Service layer with `try/catch` and `winston` logging.
- `disableEnableUserAccount`
- `deleteUserAccount`
- `addSubAdmin`
- `getSubAdminById`
- `deleteSubAdminById`
- `updateUserAndPermissions`
- `adminGetAllUsers`
- `adminGetUserById`
- `adminUpdateUser`

### `controllers/index.js`
Export the new controller.

---

## 5. API Routes Layer

### `routes/userProfileRoutes.js`
Define the endpoints with Swagger documentation.

- `PUT /admin/disableEnableUserAccount`
- `DELETE /admin/deleteUserAccount`
- `POST /admin/addSubAdmin`
- `GET /admin/getSubAdminById/:id`
- `DELETE /admin/deleteSubAdminById/:id`
- `PUT /admin/updateUserAndPermissions`
- `GET /admin/users/getAll`
- `GET /admin/users/getById/:id`
- `PUT /admin/users/update`

### `routes/index.js` & `app.js`
Mount the routes inside your main Express app.
```javascript
// routes/index.js
const userProfileRoutes = require("./userProfileRoutes");
router.use("/admin", userProfileRoutes); 
```

---

## 6. Execution Steps

1. **Install Firebase Admin**: `npm install firebase-admin`
2. **Setup Firebase Credentials**: Add your `serviceAccountKey.json` to the backend config.
3. **Build Models & Repositories**: Create the DB structures.
4. **Build Services & Controllers**: Wire up the logic.
5. **Build Routes**: Expose the APIs.
6. **Test**: Run integration tests using Postman or an automated `test_user_apis.js` script.
