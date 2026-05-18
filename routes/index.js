const router =
  require("express")
    .Router();

const preOrderRoutes =
  require(
    "./preOrderRoutes"
  );

const orderRoutes =
  require(
    "./orderRoutes"
  );

const userProfileRoutes =
  require(
    "./userProfileRoutes"
  );

const dispatcherRoutes =
  require(
    "./dispatcherRoutes"
  );

const notificationRoutes =
  require(
    "./notificationRoutes"
  );

const globalRoutes =
  require(
    "./globalRoutes"
  );

const deliveryChargeRoutes =
  require(
    "./deliveryChargeRoutes"
  );

const driverRoutes =
  require(
    "./driverRoutes"
  );

const scheduleMessageRoutes =
  require(
    "./scheduleMessageRoutes"
  );

const appVersionRoutes =
  require(
    "./appVersionRoutes"
  );

const paymentRoutes =
  require(
    "./paymentRoutes"
  );

const promoCodeRoutes =
  require(
    "./promoCodeRoutes"
  );

const productRoutes =
  require(
    "./productRoutes"
  );

const popularMealRoutes =
  require(
    "./popularMealRoutes"
  );

const restroRoutes =
  require(
    "./restroRoute"
  );

// ======================
// Routes
// ======================

router.use(
  "/users/orders",
  preOrderRoutes
);

router.use(
  "/",
  orderRoutes
);

router.use(
  "/",
  userProfileRoutes
);

router.use(
  "/",
  dispatcherRoutes
);

router.use(
  "/",
  notificationRoutes
);

router.use(
  "/",
  globalRoutes
);

router.use(
  "/",
  deliveryChargeRoutes
);

router.use(
  "/",
  driverRoutes
);

router.use(
  "/",
  scheduleMessageRoutes
);

router.use(
  "/",
  appVersionRoutes
);

router.use(
  "/",
  paymentRoutes
);

router.use(
  "/",
  promoCodeRoutes
);

router.use(
  "/",
  productRoutes
);

router.use(
  "/",
  popularMealRoutes
);

router.use(
  "/",
  restroRoutes
);

module.exports = router;