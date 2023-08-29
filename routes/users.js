const router = require('express').Router();
const controller = require('../controllers/users-controller');

//Base Get Request is http://localhost:8080/users

router.route('/:id').get(controller.getEventListByUser);

module.exports = router;