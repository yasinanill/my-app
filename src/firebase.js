import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  getAuth,sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,onAuthStateChanged,updateProfile
} from "firebase/auth";
import toast from "react-hot-toast";
import { login as loginHandle , logout as logOutHandle} from "./store/auth";
import store from "./store";





const firebaseConfig = {
  apiKey: "AIzaSyDJYLg0rKf0g-yY2y78gVFeCdX34T2iPew",
  authDomain: "auth-firestore-15336.firebaseapp.com",
  projectId: "auth-firestore-15336",
  storageBucket: "auth-firestore-15336.appspot.com",
  messagingSenderId: "855813600729",
  appId: "1:855813600729:web:bdc599999b5aed4e5295c8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export const register = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};

export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    toast.error(error.message);
  }
};
export const logOut = async (email, password) => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    toast.error(error.message);
  }
};

export const emailVerification= async () =>{

  try{
     await sendEmailVerification(auth.currentUser)
     toast.success(`dogrulama maili ${auth.currentUser.email} adresine gonderildi`)
  }

  catch(error){
    toast.error(error.message)

  }

} 
 
export const addTodo = async data => {
   const result = await addDoc(collection(db,'todos'),data)
  console.log(result)
}


export const update = async data=> {

  try{
    await updateProfile(auth.currentUser, data) 
    toast.success('profil guncelendi')
    return true
  }
  
  catch (error){
      toast.error(error.message)
  }

}



onAuthStateChanged  (auth ,(user) => {
  if(user)
    store.dispatch(loginHandle(user))
  else{
    store.dispatch(logOutHandle(user))
  }

})





export {  db, storage };
