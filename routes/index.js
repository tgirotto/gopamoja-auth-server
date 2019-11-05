const pg = require('../config/pg');
const Router = require('express-promise-router');
const router = new Router()

/* GET home page. */
router.post('/login', async function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if(typeof email !== 'string') {
    res.status(401).json({err: "Invalid email"});
    return;
  }

  if(typeof password !== 'string') {
    res.status(401).json({err: "Invalid password"});
    return;
  }

  const q0 = "SELECT * FROM users WHERE email = $1 AND password = $2";

  try {
    const result = await pg.query(q0, [email, password])

    if(result == null || result.rows == null || result.rows.length != 1) {
      res.status(401).json({user: {}});
    } else {
      req.session.user_id = result.rows[0].id;
      res.json({user: result.rows[0]});
    }
  } catch(err) {
    res.status(500).json({err: err.toString()});
  }
});

router.get('/logout', async function(req, res, next) {
  if(req.session) {
    req.session.destroy();
  }

  res.json({res: 'ok'});
});
//
router.get('/healthcheck', function(req, res, next) {
  res.json({res: 'ok'});
});

module.exports = router;
