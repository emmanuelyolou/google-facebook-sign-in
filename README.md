# google-facebook-sign-in
Simple implementation of google and facebook sign in methods

The flow using google could be using the returned user info (name, email and so one) to 
register or log him

The flow using FB is a little more tricky:
- You should launch your app in a https environment (important)
- You must make an additional request to graph api to get the info you want after the user is logged in
- If you want to release the app officially, it must be reviewed by fb, by adding additional info in the app dashboard
(info listed on their docs)

