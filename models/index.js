//* Imports User/Post model
const User = require(`./User`);
const Post = require(`./Post`)

// create associations
User.hasMany(Post, {
  foreignKey: `user_id`,
});

Post.belongsTo(User, {
  foreignKey: `user_id`,
  onDelete:`cascade`,
});

//* Exports an object as a property
module.exports = { User, Post };