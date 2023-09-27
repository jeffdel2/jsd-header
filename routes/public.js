const express = require('express');
const router = express.Router();
const { header, validationResult } = require('express-validator');


const title = 'Demo Application';
const description = 'This is a basic unprotected page';
const doc = 'https://www.okta.com';

let urls = new Map([['/', 'Index'],['/admin', 'Admin Interface'],['/public', 'Public Page']]);

router.get(Array.from(urls.keys()),[
  header('email').isEmail(),
  header('first_name').not().isEmpty(),
  header('last_name').not().isEmpty(),
  header('device').not().isEmpty(),
  header('amr').not().isEmpty(),
  header('groups').not().isEmpty(),
  header('host').not().isEmpty(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(JSON.stringify(errors.array()));
  }

  res.render('public', 
   {
    title: title +' - '+ urls.get(req.url),
    description: description,
    req: req,
    attributes: attributes,
    errors: { errors: errors.array() },
   }
  );
});

module.exports = router;