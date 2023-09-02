const router = require('express').Router();
const controller = require('../controllers/users-controller');

//Base Get Request is http://localhost:8080/users

router.route('/info').get(controller.getAllUsersInfo)
router.route('/:id').get(controller.getEventListByUser);
router.route('/info/:id').get(controller.getUserInfo);
module.exports = router;