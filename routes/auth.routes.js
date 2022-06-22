// User Routes

const router = require("express").Router();
const User = require("../models/User.model")
const bcryptjs = require('bcryptjs')
const saltRounds = 10


/* Sign Up/Create User Route (post) */
router.post("/signup", (req, res) => {

    const { username, email, password } = req.body;

    bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(password, salt))
    .then(hashedPassword => {
      return User.create({
        username,
        email,
        password: hashedPassword
      });
    })
    .then(userFromDB => {
      console.log('Newly created user is: ', userFromDB);

    })
    .catch(error => {
      if (error.code === 11000) {
        res.status(500).render('signup', {
          errorMessage: 'Username or Email already taken.'
        });
      } else {
        next(error);
      }
    });
});


// username
 
/* Login User Route (post) */

router.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    if (email === '' || password === '') {
      res.render('auth/login', {
        errorMessage: 'Please enter both, email and password to login.'
      });
      return;
    }
    User.findOne({ email })
     // .populate('string1') --> apply the populate here later, comments and experiences
      .then(user => {
        if (!user) {
          res.render('auth/login', {
            errorMessage: 'Email is not registered. Try with other email.'
          });
          return;
        }
        else if (bcryptjs.compareSync(password, user.password)) {
          console.log(user, "this is my user")
         // req.session.currentUser = user  --> solved by react jwt
          res.redirect('/profile');  
        } else {
          res.render('auth/login', { errorMessage: 'Incorrect password.' });
        }
      })
      .catch(error => next(error))
  });


/* Logout User Route (post) */

// this route would destroy the session, which is managed by React --> unnecessary here?


/* Delete User Route (delete) */

router.post('/auth/:id', (req, res) => {
    console.log("CHECK HERE PARAMS ----->", req.params)
    User.findByIdAndDelete(req.params.id)
    // no redirect due to using React
  });

  module.exports = router;