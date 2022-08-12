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
        }
    );
}

function handleCredentialResponse(response){
    console.log(response);
    const responsePayload = parseJwt(response.credential);
    console.log(responsePayload);
}

function signOut() {
    try {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut();
    } catch (error) {
        console.log(error);
    }
}

  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};