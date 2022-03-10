var express = require('express');
var router = express.Router();
const UserController = require('../controllers/usersController');

/* GET users listing. */
// router.get('/users', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.route('/users')
  .get(UserController.index)
  .post(UserController.store)

router.get('/users/create', UserController.create)
router.get('/user/:id', UserController.show)
router.get('/user/:id/edit', UserController.edit)
router.put('/user/:id', UserController.update)
router.delete('/user/:id', UserController.destroy)

module.exports = router;
