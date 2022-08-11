//   const firebaseUrl = "https://static-bee-359111.web.app/";
document.addEventListener('DOMContentLoaded', initialize);
function initialize() {
    let appClientId = "462270519373-pinvk0cdvopptfirjbjatf9fp297tofk.apps.googleusercontent.com";
    let googleHelper = google.accounts.id;

    googleHelper.initialize({
        client_id: appClientId,
        callback: handleCredentialResponse
    });
    google.accounts.id.prompt();

    googleHelper.renderButton(
        document.querySelector('#google-sign-in'),
        { theme: "outline", size: "large" }
    );
}

function handleCredentialResponse(response){
    console.log("token: " + response,);
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
