const express = require('express');
const router = express.Router();

const controller = require('../controllers/controllers');

router.get('/',  controller.renderizado);
router.post('/',  controller.log);
router.get('/home', controller.list);
router.post('/home', controller.save);
router.get('/delete/:id', controller.delete);
router.get('/update/:id', controller.edit);
router.post('/update/:id', controller.update);
router.get('/camara', controller.camara);

module.exports = router;
