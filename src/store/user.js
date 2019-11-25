import { action } from "easy-peasy";



const user = {
 userRole:'admin',
 userInfo:{},
 setUserInfo:action((state,payload)=>state.userInfo=payload),
 changeRole:action((state,payload)=>state.userRole=payload)
};

export default user;
