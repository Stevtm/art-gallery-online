const faker = require('faker');

const db = require('../config/connection');
const { Art, User, Comment, Like } = require('../models');

db.once('open', async () => {
  await User.deleteMany({});
  await Art.deleteMany({});
  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

  // create Art
  let createdArts = [];
  for (let i = 0; i < 100; i += 1) {
    const title = faker.lorem.words(Math.round(Math.random() * 10) + 1);
    const description = faker.lorem.words(Math.round(Math.random() * 10) + 1);
    const categories = ['photograph', 'drawing', 'painting'];

    const category = Math.floor(Math.random() * categories.length);
    const price = Math.round(Math.random() * 1000);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers.ops[randomUserIndex];

    const createdArt = await Art.create({
      title,
      description,
      category,
      price,
    });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { art: createdArt._id } }
    );

    createdArts.push(createdArt);
  }

  //create Comments
  for (let i = 0; i < 100; i += 1) {
    let commentText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username } = createdUsers.ops[randomUserIndex];

    const randomArtIndex = Math.floor(Math.random() * createdArts.length);
    const { _id: artId } = createdArts[randomArtIndex];

    await Art.updateOne(
      { _id: artId },
      { $addToSet: { comments: { commentText, username } } },
      { runValidators: true }
    );
  }

  //create likes
  for (let i = 0; i < 100; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username } = createdUsers.ops[randomUserIndex];

    const randomArtIndex = Math.floor(Math.random() * createdArts.length);
    const { _id: artId } = createdArts[randomArtIndex];

    await Art.updateOne(
      { _id: artId },
      { $addToSet: { likes: { username } } },
      { runValidators: true }
    );
  }

  console.log('Finished!');
  process.exit(0);
});
