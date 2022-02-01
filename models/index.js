//* Imports User/Post model
const Vote = require(`./Vote`);
const User = require(`./User`);
const Post = require(`./Post`);
const Comment = require(`./Comments`);

// create associations
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

//* This foreign key ties both tables together.
//* Almost like a 'common denominator'. 
User.hasMany(Post, {
  foreignKey: `user_id`
});

User.hasMany(Vote, {
  foreignKey: `user_id`
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

//* will allow us to see how many posts the user has voted on.
//* 'belongsToMany()' allows the models to query each others information in the context of a vote.
User.belongsToMany(Post, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: `user_id`
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

Post.hasMany(Vote, {
  foreignKey: `post_id`
});

Post.belongsTo(User, {
  foreignKey: `user_id`
});

//* will allow us to see how many votes a user has placed on a post
Post.belongsToMany(User, {
  through: Vote, 
  as: `voted_posts`,
  foreignKey: `post_id`
});

Vote.belongsTo(User, {
  foreignKey: `user_id`
});

Vote.belongsTo(Post, {
  foreignKey: `post_id`
});

//* Exports an object as a property
module.exports = { User, Post, Vote, Comment };