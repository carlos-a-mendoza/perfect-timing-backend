const router = require('express').Router();
const controller = require('../controllers/events-controller');

//Base Get Request is http://localhost:8080/

router.route('/').get(controller.getEventList).post(controller.createNewEvent);
router.route('/:id').get(controller.getEventById).delete(controller.deleteEvent);

module.exports = router;