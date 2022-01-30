//* Imports User/Post model
const User = require(`./User`);
const Post = require(`./Post`)

// create associations
//* This foreign key ties both tables together.
//* Almost like a 'common denominator'. 
User.hasMany(Post, {
  foreignKey: `user_id`
});

Post.belongsTo(User, {
  foreignKey: `user_id`
});

//* Exports an object as a property
module.exports = { User, Post };