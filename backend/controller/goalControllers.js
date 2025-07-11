const asyncHandler = require('express-async-handler');

const Goal = require('../model/goalModel');
const User = require('../model/userModel');

// @desc Get goals
// @route GET /api/goals
// @access Private

const getGoal = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

// @desc Set goals
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please fill the text field!');
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.json({ goal });
});

// @desc Update goals
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error('Goal not Found');
  }
  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not Found');
  }
  // make sure the loggedIn User matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updatedGoal);
});

// @desc Delete goals
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error('goal not found');
  }

  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not Found');
  }

  // make sure logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not Authorized');
  }

  const goalDeleted = await Goal.findByIdAndDelete(req.params.id);
  res.json(goalDeleted);
});

module.exports = {
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
};
