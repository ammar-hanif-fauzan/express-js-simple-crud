var express = require('express');
var router = express.Router();
const UserController = require('../controllers/usersController');

/* GET users listing. */
// router.get('/users', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/users', UserController.index)

// router.route('/users')
//   .get(userController.index)
//   .post(userController.store)

router.get('/users/create', UserController.create)
// router.get('/user/:id', userController.show)
// router.get('/user/:id/edit', userController.edit)
// router.post('/user/:id', userController.update)
// router.delete('/user/:userId', userController.destroy)

module.exports = router;
