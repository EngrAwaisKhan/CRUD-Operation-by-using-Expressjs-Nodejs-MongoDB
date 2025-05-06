const express = require('express');
const router = express.Router();
const {
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
} = require('../controller/goalControllers');

// router.get('/', getGoal);
// router.post('/', setGoal);
// router.put('/:id', updateGoal);
// router.delete('/:id', deleteGoal);

router.route('/').get(getGoal).post(setGoal);
router.route('/:id').put(updateGoal).delete(deleteGoal);
module.exports = router;
