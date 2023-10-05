const Query = require("./models/query");
const User = require("./models/user"); // Assuming the file path is correct

// Example: Inserting data
User.create({
  email: "usermail@email.com",
  firstName: "Example",
  lastName: "User",
  password: "hashedpassword",
  phone_number: "1234567890",
  level: 1,
  county: "Nairobi",
  constituency: "Kasarani",
  ward: "Kahawa",
})
  .then((user) => {
    console.log("User created:", user.toJSON());
  })
  .catch((error) => {
    console.error("Error creating user:");
  });

// Example: Updating data
// User.update(
//   { email: "exampleChanged@email.com" },
//   {
//     where: { email: "example@email.com" },
//     returning: true,
//   }
// )
//   .then(() => {
//     console.log("User updated");
//   })
//   .catch((error) => {
//     console.error("Failed to update user");
//   });

// User.destroy({
//   where: { email: "NEW_EMAIL@email.com" },
// })
//   .then(() => {
//     console.log("User destroyed successfully");
//   })
//   .catch((error) => {
//     console.error("Cannot delete record");
//   });

// User.count({
//   where: { level: 1 },
// })
//   .then((count) => {
//     console.log("Number of users with level 1:", count);
//   })
//   .catch((error) => {
//     console.error("Error counting users:");
//   });

// User.findAll()
//   .then((users) => {
//     console.log(
//       "All users:",
//       users.map((user) => user.toJSON())
//     );
//   })
//   .catch((error) => {
//     console.error("Error finding all users:");
//   });

// User.findAll({
//   where: { level: 1 },
// })
//   .then((users) => {
//     console.log(
//       "Users with level 1:",
//       users.map((user) => user.toJSON())
//     );
//   })
//   .catch((error) => {
//     console.error("Error finding users:");
//   });

async function getUser(email) {
  try {
    const userr = await User.findOne({
      where: { email: email },
    });
    return userr;
  } catch (error) {
    console.log(error);
  }
}

getUser("usermail@email.com")
  .then((returned) => {
    console.log(returned.id);
  })
  .catch((error) => {
    console.log(error);
  });

async function createQuery(email, title, body) {
  const user = await getUser(email);
  newQuery = await Query.create({
    title: title,
    queryBody: body,
    userId: user.id,
  });
  console.log(newQuery);
}

createQuery(
  "usermail@email.com",
  "Should we change anything?",
  "This will assess how comfortable you are with the status quo"
);
