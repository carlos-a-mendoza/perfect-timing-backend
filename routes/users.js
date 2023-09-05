const router = require('express').Router();
const controller = require('../controllers/users-controller');

//Base Get Request is http://localhost:8080/users

router.route('/info').get(controller.getAllUsersInfo)
router.route('/:id').get(controller.getEventListByUser);
router.route('/info/:id').get(controller.getUserInfo);
router.route('/groups/allusers').get(controller.allGroups);
router.route('/groups/:id').get(controller.getUserGroupsImInvolvedIn);
router.route('/usersingroup/:group_name').get(controller.getUsersInGroup);
router.route('/addusertogroup').post(controller.addUserToGroup);
module.exports = router;