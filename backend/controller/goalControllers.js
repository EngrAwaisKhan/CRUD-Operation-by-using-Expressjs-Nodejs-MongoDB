const asyncHandler = require('express-async-handler');

const Goal = require('../model/goalModel');

// @desc Get goals
// @route GET /api/goals
// @access Private

const getGoal = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
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

  const goalDeleted = await Goal.findByIdAndDelete(req.params.id);
  res.json(goalDeleted);
});

module.exports = {
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
};
