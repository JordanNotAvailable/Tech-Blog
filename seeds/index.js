const seedBlogs = require('./Blog-seeds');
const seedComments = require('./Comments-seeds');
const seedUsers = require('./User-seeds');
const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUsers();
  console.log('\n----- Users are SYNCED -----\n');

  await seedBlogs();
  console.log('\n----- Blogs are SYNCED -----\n');

  await seedComments();
  console.log('\n----- Comments are SYNCED -----\n');

  process.exit(0);
};

seedAll();