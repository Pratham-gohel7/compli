var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.use("/pdfs", express.static(path.join(__dirname, "public/pdfs")));


module.exports = router;
