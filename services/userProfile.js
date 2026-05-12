const userRepo = require("../repository/index").userRepo;
const admin = require("../config/firebase");

const disableEnableUserAccount = async (id, isDisabled) => {
  if (!id) throw new Error("userId is required");
  
 
  if (admin.apps?.length) {
    await admin.auth().updateUser(id, { disabled: isDisabled });
  }

  return await userRepo.updateUser(id, { deleted: isDisabled });
};

const deleteUserAccount = async (id) => {
  if (!id) throw new Error("userId is required");


  if (admin.apps?.length) {
    try {
      await admin.auth().deleteUser(id);
    } catch (e) {
      console.warn("Firebase deleteUser err (might already be deleted):", e.message);
    }
  }


  return await userRepo.updateUser(id, { deleted: true });
};

const addSubAdmin = async (data) => {
  if (!data.email || !data.password || !data.name) {
    throw new Error("email, password, and name are required");
  }

  let uid;
  

  if (admin.apps?.length) {
    const userRecord = await admin.auth().createUser({
      email: data.email,
      password: data.password,
      displayName: data.name,
    });
    uid = userRecord.uid;
  } else {
    
    uid = "subadmin_" + Date.now().toString();
  }

  
  const payload = {
    id: uid,
    name: data.name,
    email: data.email,
    roles: ["admin"],
    permissions: data.permissions || {},
    fcmToken: [],
    isAnonymous: false,
    deleted: false,
    createdAt: Date.now(),
  };

  return await userRepo.createUser(payload);
};

const getSubAdminById = async (id) => {
  if (!id) throw new Error("userId is required");
  const user = await userRepo.getUserById(id);
  if (!user) throw new Error("User not found");
  
 
  if (!user.roles.includes("admin")) {
    throw new Error("User is not an admin");
  }
  return user;
};

const deleteSubAdminById = async (id) => {
  if (!id) throw new Error("userId is required");
  
  
  const user = await getSubAdminById(id);


  if (admin.apps?.length) {
    try {
      await admin.auth().deleteUser(id);
    } catch (e) {
      console.warn("Firebase deleteUser err:", e.message);
    }
  }

 
  await userRepo.deleteUser(id);
  return { message: "Sub-admin completely deleted" };
};

const updateUserAndPermissions = async (id, data) => {
  if (!id) throw new Error("userId is required");
  const existingUser = await getSubAdminById(id);
  
  const updateData = {};
  if (data.name) updateData.name = data.name;
  if (data.permissions) updateData.permissions = data.permissions;
  if (data.fcmToken) updateData.fcmToken = data.fcmToken;

  return await userRepo.updateUser(id, updateData);
};

const createDefaultAdmin = async () => {
  try {
    const existingAdmin = await userRepo.getUserById("admin");
    if (existingAdmin) {
      console.log("Default admin already exists");
      return existingAdmin;
    }
  } catch (e) {
    // Admin doesn't exist, proceed with creation
  }

  const adminData = {
    id: "admin",
    name: "Admin",
    email: "admin@fooddelivery.com",
    roles: ["admin"],
    permissions: { all: true },
    fcmToken: [],
    isAnonymous: false,
    deleted: false,
    createdAt: Date.now(),
  };

  try {
    return await userRepo.createUser(adminData);
  } catch (e) {
    console.log("Default admin creation:", e.message);
    return null;
  }
};

const adminGetAllUsers = async (query) => {
  const filter = {};
  if (query.deleted !== undefined) {
    filter.deleted = query.deleted === "true";
  }
  if (query.isAnonymous !== undefined) {
    filter.isAnonymous = query.isAnonymous === "true";
  }
 
  
  let data = await userRepo.getAllUserProfiles(filter);
  
  if (query.role) {
    data = data.filter(u => u.roles && u.roles.includes(query.role));
  }
  
  return data;
};

const adminGetUserById = async (id) => {
  if (!id) throw new Error("userId is required");
  const user = await userRepo.getUserById(id);
  if (!user) throw new Error("User not found");
  return user;
};

const adminUpdateUser = async (id, data) => {
  if (!id) throw new Error("userId is required");
  const existingUser = await userRepo.getUserById(id);
  if (!existingUser) throw new Error("User not found");


  delete data.id;
  delete data.createdAt;

  return await userRepo.updateUser(id, data);
};

module.exports = {
  disableEnableUserAccount,
  deleteUserAccount,
  addSubAdmin,
  getSubAdminById,
  deleteSubAdminById,
  updateUserAndPermissions,
  adminGetAllUsers,
  adminGetUserById,
  adminUpdateUser,
  createDefaultAdmin,
};