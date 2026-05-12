const { Dispatcher, userProfile } = require("../models/index");

/**
 * Middleware to verify if the user is a Dispatcher
 */
const verifyDispatcher = async (req, res, next) => {
  try {
    if (!req.userProfile) {
      return res.status(401).json({ success: false, message: "Unauthorized: User not authenticated" });
    }

    if (!req.userProfile.roles.includes("dispatcher")) {
      return res.status(403).json({ success: false, message: "Forbidden: Dispatcher access required" });
    }

    // Attach dispatcher info to request
    const dispatcher = await Dispatcher.findByPk(req.user.id);
    if (!dispatcher) {
      return res.status(404).json({ success: false, message: "Dispatcher profile not found" });
    }

    req.dispatcher = dispatcher;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: `Error: ${error.message}` });
  }
};

/**
 * Middleware to verify specific dispatcher permission
 */
const verifyDispatcherPermission = (permissionKey) => {
  return async (req, res, next) => {
    try {
      if (!req.dispatcher) {
        return res.status(401).json({ success: false, message: "Unauthorized: Dispatcher not found" });
      }

      if (!req.dispatcher.permissions[permissionKey]) {
        return res.status(403).json({ 
          success: false, 
          message: `Forbidden: ${permissionKey} permission required` 
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({ success: false, message: `Error: ${error.message}` });
    }
  };
};

module.exports = {
  verifyDispatcher,
  verifyDispatcherPermission
};
