/////////////// ROUTER
var express         = require('express');
var router          = express.Router();

router.get('/', (req, res) => {
    res.json({"result": 1, "message": "Base Path"});
});
router.use('/example', require('../controller/example'));
module.exports = router;
