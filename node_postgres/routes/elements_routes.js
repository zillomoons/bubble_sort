const Router = require('express');
const router = new Router();
const elementsController = require('../controllers/elem_controller');

router.post('/elements', elementsController.createElements);
router.get('/elements/:id', elementsController.getElementsBySortingId);

module.exports = router;
