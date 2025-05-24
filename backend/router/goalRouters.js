const express = require('express');
const router = express.Router();
const {
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
} = require('../controller/goalControllers');
const { protect } = require('../middleware/authMiddleware');

// router.get('/', getGoal);
// router.post('/', setGoal);
// router.put('/:id', updateGoal);
// router.delete('/:id', deleteGoal);

router.route('/').get(protect, getGoal).post(protect, setGoal);
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal);
module.exports = router;
