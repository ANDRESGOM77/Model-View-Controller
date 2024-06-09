const seedUsers = require("./users");
const blogSeed = require("./blogs");
const seedComments = require("./comments");

const sequelize = require("../config/connection");

const seedAll = async () => {

  await sequelize.sync({ force: true });

  await seedUsers();
  await blogSeed();
  await seedComments();

  process.exit(0);
};

seedAll();