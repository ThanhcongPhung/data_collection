const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const domainController = require('../controllers/domain')
// router.get(
//     '/domain/get-result',
//     // asyncMiddleware(resultController.getInfoResult),
// );
router.post(
    '/domain/create',
    asyncMiddleware(domainController.createDomain),
);

module.exports = router;
