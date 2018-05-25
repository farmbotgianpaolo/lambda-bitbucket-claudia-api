///////////// simple controller
var router          	= require('express').Router();

/* Sub Routes */
router.get('/', exampleRoute);

function exampleRoute(req, res) 
{
	res.json({"result": 1, "message": "example controller"});
}

module.exports = router;