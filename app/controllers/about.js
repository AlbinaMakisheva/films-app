'use strict';

// import all required modules
const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const uuid = require('uuid');
const developerStore= require('../models/developer-store.js');
const commentsStore=require('../models/comments.js');
// create about object
const about = {
  
  // index method - responsible for creating and rendering the view
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    // display confirmation message in log
    logger.info('about rendering');
    if (loggedInUser) {
    // create view data object (contains data to be sent to the view e.g. page title)
    const viewData = {
     title: 'About the Filmlist App',
      developers: developerStore.getAllDevelopers(),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      userpic: loggedInUser.userpic,
      comments:commentsStore.getAllComments(),
    };
    
    // render the about view and pass through the data
    logger.info('about to render', viewData);
    response.render('about', viewData);
    }
    else response.redirect('/');
  },
  
  
   deleteComment(request, response) {
    const commentId = request.params.id;
    logger.debug(`Deleting Comment ${commentId}`);
    commentsStore.removeComment(commentId);
    response.redirect('/about');
  }, 
  
  
  addComment(request,response){
    const newComment={
      id:uuid(),
      usercomment:request.body.usercomment,
      
    };
   
    commentsStore.addComment(newComment);
    response.redirect('/about');
    
  }
};

// export the about module
module.exports = about;