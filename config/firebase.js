module.exports = {
  apps: [],
  auth: () => ({
    updateUser: async () => {},
    deleteUser: async () => {},
    createUser: async () => ({ uid: `subadmin_${Date.now()}` }),
  }),
};
