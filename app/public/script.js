const ratebtn  = document.querySelector("#rateit");

ratebtn &&
  ratebtn.addEventListener("click", () => {
   let userRating = parseInt(prompt("Rate this collection (from 1 to 5 stars)"));
  if (userRating>5 || userRating<1 || isNaN(userRating)){
    alert("Try again with a number between 1 and 5!");
  }
  else{

    document.querySelector("#rating").innerHTML = "You gave a rating of: ";
    for (let i=0; i < userRating; i++){
        document.querySelector("#rating").innerHTML +="<i class='yellow star icon'></i>";
    }
  }
});


function NotificationLike(){
          let ntf=document.getElementById("contentlike")
          if(ntf.style.display=="none"){
            ntf.style.display="flex"
          }else{
            ntf.style.display="none"
          }
        }
function NotificationInfo(){
          let ntf=document.getElementById("contentinfo")
          if(ntf.style.display=="none"){
            ntf.style.display="flex"
          }else{
            ntf.style.display="none"
          }
        }
function CloseNotif(){
          document.getElementById("contentinfo").style.display="none";
          document.getElementById("contentlike").style.display="none";
        }
//function NightMode(){
 // var body=document.body;
 // body.classList.toggle("dark-mode");
//  
//}



//function Darkmode(){
//    $('body').addClass('dark-mode');
  //  window.localStorage.setItem("mode", "dark");
  //  }

//function Lightmode(){
  //   $('body').removeClass('dark-mode');
  //    window.localStorage.setItem("mode", "light");
   //   }

$('#nightbutton').click(function(){   

    if ($(this).prop('click')&& window.localStorage.getItem("mode")=="light")
    { 
      //Darkmode();
    $('body').addClass('dark-mode');
    window.localStorage.setItem("mode", "dark");
    }
 
    else if($(this).prop('click')&& window.localStorage.getItem("mode")=="dark"){
   // Lightmode();
       $('body').removeClass('dark-mode');
      window.localStorage.setItem("mode", "light");
    }

});

//const container= document.body;
//if(localStorage.getItem("mode")){
 // container.setAttribute("mode",localStorage.getItem("mode"));
 // function Mo(1);
//}




                        
$(".delfilm").click(() => confirm('Really delete this film?'));
$(".delfilmlist").click(() => confirm('Really delete this filmlist?'));
$(".delcomment").click(() => confirm('Really delete this comment?'));
$(".delprofil").click(() => confirm('Really delete your account?'));