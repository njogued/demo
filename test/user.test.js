const { expect } = require("chai");
const { Sequelize } = require("sequelize");
const { clearDatabase } = require("sequelize-test-helpers");
const User = require("../models/user");
const assert = require("assert");
const Query = require("../models/query");

describe("test the user model", () => {
  it("should ensure that user is created", async () => {
    const user = await User.create({
      email: "example@email.com",
      userName: "ExampleUser",
      firstName: "Example",
      lastName: "User",
      password: "hashedpassword",
      phone_number: "1234567890",
      level: 1,
      county: "Nairobi",
      constituency: "Kasarani",
      ward: "Kahawa",
    });
    expect(user).to.have.property("id");
    expect(user.email).to.be.equal("example@email.com");
  });
  it("should ensure that a user is updated", async () => {
    await User.update(
      { email: "exampleChanged@email.com" },
      {
        where: { email: "example@email.com" },
        returning: true,
      }
    );
    const deletedUser = await User.findOne({
      where: { email: "example@email.com" },
    });
    assert.strictEqual(deletedUser, null, "Original user should not exist");
  });
  it("should create a new query for the user", async () => {
    const queryCreator = await User.findOne({
      where: { email: "exampleChanged@email.com" },
    });
    const newQuery = await Query.create({
      title: "Should we change anything?",
      queryBody: "This will assess how comfortable you are with the status quo",
      userId: queryCreator.id,
    });
    expect(newQuery, "Expect a new query created").to.exist;
    expect(newQuery.userId, "Ensure query creator is correct").to.equal(
      queryCreator.id
    );
  });
  it("should ensure that a user is deleted", async () => {
    await User.destroy({
      where: { email: "exampleChanged@email.com" },
    });
    const deletedUser = await User.findOne({
      where: { email: "exampleChanged@email.com" },
    });
    assert.strictEqual(deletedUser, null, "User should not exist");
  });
});
