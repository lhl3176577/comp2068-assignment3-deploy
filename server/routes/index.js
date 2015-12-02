/*file name: Web_assignment3
Author Name: HongliangLiu(200255269)
website Name:https://hongliangliuassignment2.herokuapp.com.
file information please read readme file.
*/  
var express = require('express');
var passport = require('passport');
var router = express.Router();

var User = require('../models/user');

/* Utility functin to check if user is authenticated */
function requireAuth(req, res, next){

  // check if the user is logged in
  if(!req.isAuthenticated()){
    return res.redirect('/login');
  }
  next();
}




/* Render home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Home',
        displayName: req.user ? req.user.displayName : ''
    });
});

/* GET ABOUT,PEOJECT,SERVER,CONTACT page */
router.get('/about', function(req, res, next) {
   res.render('about',{title:"About", displayName: req.user ? req.user.displayName : ''}); 
});

router.get('/contact', function(req, res, next) {
   res.render('contact',{title:"Contact", displayName: req.user ? req.user.displayName : ''}); 
});

router.get('/project', function(req, res, next) {
   res.render('project',{title:"Project", displayName: req.user ? req.user.displayName : ''}); 
});

router.get('/server', function(req, res, next) {
   res.render('server',{title:"Server", displayName: req.user ? req.user.displayName : ''}); 
});

/* Render Login page. */
router.get('/login', function (req, res, next) {
    if (!req.user) {
        res.render('login', {
            title: 'Login',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/businesses');
    }
});

/* Process the Login Request */
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/businesses',
    failureRedirect: '/login',
    failureFlash: true
}));

/* Show Registration Page */
router.get('/register', function (req, res, next) {
    if (!req.user) {
        res.render('register', {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/');
    }
});

/* POST signup data. */
router.post('/register', passport.authenticate('local-registration', {
    //Success go to Profile Page / Fail go to Signup page
    successRedirect : '/businesses',
    failureRedirect : '/register',
    failureFlash : true
}));


/* Process Logout Request */
router.get('/logout', function (req, res){
  req.logout();
  res.redirect('/');
});

/* GET home page. */
router.get('/todoList', requireAuth, function(req, res, next) {
  res.render('todos/index', { 
      title: 'Todo List',
      displayName: req.user ? req.user.displayName : '',
      username: req.user ? req.user.username : '' 
  });
});



module.exports = router;
