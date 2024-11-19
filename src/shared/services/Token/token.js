const tokenkey="SAC_TAMIL";

//const navigate = useNavigate();

const login = (token)=>{
  console.log(token)
  localStorage.setItem(tokenkey, token);
}

const gettoken=()=>{
  const token=localStorage.getItem(tokenkey);
  return token;
}

const isLoggedIn=()=>{
  return gettoken()?true:false;
}

const settoken=(token)=>{
  return localStorage.setItem(tokenkey,token);
}

const logout = () => {

  //set({ isLoggedIn: false, user: null });
}

const getuserdetails = () => {
    var token = gettoken();
   
    if (gettoken() != null) {
        try{
          var userData = JSON.parse(window.atob(token.split(".")[1]));
          // console.log(userData.data)
          return userData.data;
       } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    } else {
      return null;
    }
  };


const removetoken=()=>{
   return localStorage.removeItem(tokenkey);
}
export {gettoken,isLoggedIn,settoken,getuserdetails,removetoken, login, logout};