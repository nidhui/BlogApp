const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite3'
});

// User model
const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING
});

// BlogPost model
const BlogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    tags: DataTypes.STRING
});

// Comment model (optional)
const Comment = sequelize.define('Comment', {
    content: DataTypes.TEXT
});

// Relationships
User.hasMany(BlogPost);
BlogPost.belongsTo(User);
BlogPost.hasMany(Comment);
Comment.belongsTo(BlogPost);
User.hasMany(Comment);
Comment.belongsTo(User);

// Sync database
sequelize.sync();

module.exports = { User, BlogPost, Comment };
