'use strict';

// import all required modules
const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const filmlistStore = require('../models/filmlist-store.js');

// create start object
const start = {
  
  // index method - responsible for creating and rendering the view
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    // display confirmation message in log
    logger.info('start rendering');
    
    // app statistics calculations
 if(loggedInUser){
     const filmlists = filmlistStore.getAllFilmlists();
     const usersfilmlists=filmlistStore.getUserFilmlists(loggedInUser.id);
   
     let numFilmlists = filmlists.length;

     var numFilms = 0;
     
   
     var usersStatFL=usersfilmlists.length;
     var userStatF=0;
      var useraverageCat=0;
     var userhorrorFilms=0;
     var userthrillerFilms=0;
     var usercomedyFilms=0;
     var userdramaFilms=0;
     var userfantasyFilms=0;
     var userleastItems=0;
     var usermostItems=0;
     var userarrayOfGenres=[];
   
     for(let item of usersfilmlists){
         for (var i=0; i<item.films.length;i++)
        { 
         userStatF++;
          if (item.films[i].genre=="Horror"){
         userhorrorFilms ++;
         
         }else if(item.films[i].genre=="Thriller"){
           userthrillerFilms ++;
          
         }else if(item.films[i].genre=="Comedy"){
           usercomedyFilms++;
          
         }else if(item.films[i].genre=="Fantasy"){
           userfantasyFilms ++;
         
         }else if(item.films[i].genre=="Drama"){
           userdramaFilms ++;
         
         }
          
          userarrayOfGenres[0]=userhorrorFilms;
          userarrayOfGenres[1]=userthrillerFilms;
          userarrayOfGenres[2]=usercomedyFilms;
          userarrayOfGenres[3]=userfantasyFilms;
          userarrayOfGenres[4]=userdramaFilms;
          
          
          
          var useraverageCat=userStatF/userarrayOfGenres.length;
          userarrayOfGenres.sort(function(a, b){return a - b});
          var usermostItems=userarrayOfGenres[userarrayOfGenres.length-1];
          var userleastItems=userarrayOfGenres[0];
       }
       
     }
   
   
   
     var horrorFilms=0;
     var thrillerFilms=0;
     var comedyFilms=0;
     var dramaFilms=0;
     var fantasyFilms=0;
     var arrayOfGenres=[];
   
     for (let item of filmlists) {
     numFilms += item.films.length;
       
       for (var i=0; i<item.films.length;i++)
        { 
         
          if (item.films[i].genre=="Horror"){
         horrorFilms ++;
         
         }else if(item.films[i].genre=="Thriller"){
           thrillerFilms ++;
          
         }else if(item.films[i].genre=="Comedy"){
           comedyFilms++;
          
         }else if(item.films[i].genre=="Fantasy"){
           fantasyFilms ++;
         
         }else if(item.films[i].genre=="Drama"){
           dramaFilms ++;
         
         }
          
          arrayOfGenres[0]=horrorFilms;
          arrayOfGenres[1]=thrillerFilms;
          arrayOfGenres[2]=comedyFilms;
          arrayOfGenres[3]=fantasyFilms;
          arrayOfGenres[4]=dramaFilms;
          
          var averageCat=numFilms/arrayOfGenres.length;
          arrayOfGenres.sort(function(a, b){return a - b});
          var mostItems=arrayOfGenres[arrayOfGenres.length-1];
          var leastItems=arrayOfGenres[0];
         
        }
        }
        
      
    
    // create view data object (contains data to be sent to the view e.g. page title)
    const viewData = {
      title: 'Welcome to the Filmlist App!',
      totalFilmlists: numFilmlists,
      totalFilms: numFilms,
      totalHorrors:horrorFilms,
      totalComedies:comedyFilms,
      totalThrillers:thrillerFilms,
      totalDramas:dramaFilms,
      totalFantasies:fantasyFilms,
      averageC: averageCat,
      mostC:mostItems,
      leastC:leastItems,
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      userpic: loggedInUser.userpic,
      usersTFL:usersStatFL,
      usersF:userStatF,
      
      
      usertotalHorrors:userhorrorFilms,
      usertotalComedies:usercomedyFilms,
      usertotalThrillers:userthrillerFilms,
      usertotalDramas:userdramaFilms,
      usertotalFantasies:userfantasyFilms,
      useraverageC: useraverageCat,
      usermostC:usermostItems,
      userleastC:userleastItems,
    };
    
    // render the start view and pass through the data
    response.render('start', viewData);
 } else response.redirect('/');
  },
};

// export the start module
module.exports = start;