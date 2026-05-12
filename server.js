require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });

const app = require("./app");
const db = require("./models");
const { userService } = require("./services/index");

const PORT = process.env.PORT || 3000;

db.sequelize.sync({ force: true }).then(async () => {
  await userService.createDefaultAdmin();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});