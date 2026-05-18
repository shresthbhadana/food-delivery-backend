const db = require("./models");

db.sequelize.sync({ force: true })
  .then(() => {
    console.log("Sync successful!");
  })
  .catch(err => {
    console.error("Sync failed!");
    console.error(err);
  });
