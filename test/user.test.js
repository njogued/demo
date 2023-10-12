const { expect } = require("chai");
// const { Sequelize } = require("sequelize");
// const { clearDatabase } = require("sequelize-test-helpers");
const User = require("../models/user");
const assert = require("assert");
const Query = require("../models/query");
const Vote = require("../models/vote");
const Review = require("../models/review");

describe("test the models", () => {
  it("should ensure that user is created", async () => {
    const user = await User.create({
      email: "example@email.com",
      userName: "ExampleUser",
      firstName: "Example",
      lastName: "User",
      password: "unhashedpassword",
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
  it("should create a new vote for the query", async () => {
    const queryCreator = await User.findOne({
      where: { email: "exampleChanged@email.com" },
    });
    const voter = await User.create({
      email: "newvotertest@email.com",
      userName: "TestVoter",
      firstName: "Test",
      lastName: "Voter",
      password: "unhashedpassword",
      phone_number: "1234567890",
      level: 1,
      county: "Nairobi",
      constituency: "Kasarani",
      ward: "Kahawa",
    });
    const newQuery = await Query.create({
      title: "Would?",
      queryBody: "ikr",
      userId: queryCreator.id,
    });
    const newVote = await Vote.create({
      voteType: 1,
      voteTitle: "Yes",
      voteBody: "Just Because",
      voterId: voter.id,
      queryId: newQuery.id,
    });
    expect(newVote, "Expect a new vote created").to.exist;
  });
  it("should create a new review for the vote", async () => {
    const queryCreator = await User.findOne({
      where: { email: "exampleChanged@email.com" },
    });
    const voter = await User.findOne({
      where: { email: "newvotertest@email.com" },
    });
    const newQuery = await Query.create({
      title: "Should?",
      queryBody: "maybe",
      userId: queryCreator.id,
    });
    const newVote = await Vote.create({
      voteType: 1,
      voteTitle: "Yes",
      voteBody: "Just Because",
      voterId: voter.id,
      queryId: newQuery.id,
    });
    const reviewer = await User.create({
      email: "newreviewertest@email.com",
      userName: "TestReviewer",
      firstName: "Test",
      lastName: "Reviewer",
      password: "unhashedpassword",
      phone_number: "1234567890",
      level: 1,
      county: "Nairobi",
      constituency: "Kasarani",
      ward: "Kahawa",
    });
    const newReview = await Review.create({
      voteType: 1,
      reviewBody: "Just Because",
      reviewerId: reviewer.id,
      voteId: newVote.id,
    });
    expect(newReview, "Expect a new review created").to.exist;
  });
  it("should ensure that a user is deleted", async () => {
    await User.destroy({
      where: { email: "exampleChanged@email.com" },
    });
    await User.destroy({
      where: { email: "newvotertest@email.com" },
    });
    await User.destroy({
      where: { email: "newreviewertest@email.com" },
    });
    const deletedUser = await User.findOne({
      where: { email: "exampleChanged@email.com" },
    });
    assert.strictEqual(deletedUser, null, "User should not exist");
  });
});
