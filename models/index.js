const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

// User can have many blogs
User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// Blog can only belong to one user
Blog.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// Comments can only belong to one user
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});


// Comments exist wihtin the blog 
Comment.belongsTo(Blog, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE',
});

// User can have many comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// Blog can have many comments
Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE',
});

module.exports = { User, Blog, Comment };