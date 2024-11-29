import React from 'react';
import FacebookLogin from 'react-facebook-login';

const LoginForm = (props) => {
  const handleFacebookCallback = (response) => {
    if (response?.status === "unknown") {
        console.error('Sorry!', 'Something went wrong with facebook Login.');
     return;
    }
    console.log(response);
   }

  return (
    <FacebookLogin 
      buttonStyle={{padding:"6px"}}  
      appId="1240499260516780"  // we need to get this from facebook developer console by setting the app.
      autoLoad={false}  
      fields="name,email,picture"  
      callback={handleFacebookCallback}/>
  );
};

export default LoginForm;