export const handleCookies=(duration,cookieVaribale,cookieValue,idBasedVariables,id,res)=>{
    //cookie expiration time
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + duration);
     res.cookie(cookieVaribale, cookieValue, {
      httpOnly: false,
      sameSite: 'none',
      secure: true,
      expires: expires,
    });
     res.cookie(idBasedVariables,id, {
      httpOnly: false,
      sameSite: 'none',
      secure: true,
      expires: expires,
       path: '/'
    });
}
export const getCookieInfo=(Cookiearray)=>{
    const obj = {};
    //get saved token from local storage
    for (let i = 0; i < Cookiearray.length; i++) {
      const parts = Cookiearray[i].split('=');
      const key = parts[0].trim(); // Trim the key
      const value = parts[1].trim().replace(/=/g, ':');
      obj[key] = value;
    }
    const cookieObjects = obj;
    return cookieObjects;
}
export const saveOTPusage=(expire,Varibale,Value,res)=>{
  //cookie expiration time
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + expire);
   res.cookie(Varibale,Value, {
    httpOnly: false,
    sameSite: 'none',
    secure: true,
    expires: expires,
  });
}