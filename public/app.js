//   const firebaseUrl = "https://static-bee-359111.web.app/";
var appClientId = "462270519373-pinvk0cdvopptfirjbjatf9fp297tofk.apps.googleusercontent.com";
document.addEventListener('DOMContentLoaded', initialize);
function initialize() {
    let googleHelper = google.accounts.id;

    googleHelper.initialize({
        client_id: appClientId,
        callback: handleCredentialResponse
    });
    google.accounts.id.prompt();

    googleHelper.renderButton(
        document.querySelector('#google-sign-in'),
        { 
            theme: "outline", size: "large",
            width: "272px" //calculated to fit the same size as inputs
        }
    );
}

function handleCredentialResponse(response){
    console.log(response);
    const responsePayload = parseJwt(response.credential);
    console.log(responsePayload);
}

  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

//Facebook
const fbAppId = "773896347069718";
window.fbAsyncInit = function() {
    FB.init({
      appId      : fbAppId,
      cookie     : true,
      xfbml      : true,
      version    : 'v14.0'
    });
      
    FB.AppEvents.logPageView();   
    document.querySelector('.fb-login-btn').addEventListener('click', function (e){ LogInWithFacebook(e)});
    document.querySelector('.fb-logout-btn').addEventListener('click', function (e){ logOutFromFacebook(e)});

    function LogInWithFacebook(e){
        e.preventDefault();
        //TODO: Search for a way to separate functions from the fbAsyncInit method
        FB.login(function(response){
            console.log(response);
            FB.getLoginStatus(function(response) {
                if(response.status == "connected"){
                    // alert('Utilisateur connecté');
                    FB.api('/me', function(response) {
                        console.log(response);
                    });
                }
                else{
                    //
                }
            });
        }, {
            scope: 'public_profile,email',
            return_scopes: true            
        });
    }

    function logOutFromFacebook(e){
        e.preventDefault();
        FB.logout(function(response) {
            alert('Utilisateur déconnecté');
            console.log(response);
         });
    }
  };

  //Initializes the javascript sdk
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

 
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

