
import React, { useState } from "react";
import { update ,auth, } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/auth";

export default function UpdateProfile() {
  
    const dispatch = useDispatch()
      const { user } = useSelector(state => state.auth)
    const [displayName , setDisplayName] = useState(user.displayName)
  


    const handleSubmit =async  e=> {
        e.preventDefault()

        await update({
            displayName 
       
        })
       dispatch(login(auth.currentUser))

    }

    return (
    <div>
    
      <form className="form" onSubmit={handleSubmit} >
        <div className="input-group">
          <label htmlFor="email">ad soyad</label>
   
        </div>
        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input
            type="text"
            placeholder={user.displayName}
            name="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <button className="primary">Guncelle</button>
      </form>
    </div>
  );
}
