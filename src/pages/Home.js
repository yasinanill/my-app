import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import  {useDispatch, useSelector} from 'react-redux'
import { logOut  , emailVerification} from '../firebase'

import { logout as LogOuthandle  } from '../store/auth'
import UpdateProfile from '../components/updateProfile'
import { addTodo } from '../firebase'

const Home = () => {



    const [todo ,setTodo] = useState('')

    const dispatch =  useDispatch()
    const navigate = useNavigate();
    const {user }= useSelector(state => state.auth)

    const handleLogOut = async ()=>{
            await logOut()
            dispatch(LogOuthandle())
            navigate('/login' , {
                replace:true
            })
    }
    const handleVerication =  async ()=>{
        await emailVerification()


    }
    const handleSubmitt = async e => {
        e.preventDefault()
        await addTodo({
                todo,
                uid : user.uid
            })
    }


    if (user) 
    {
        return(
            <div>
                <h1>Hosgeldin ({user.email})</h1>
                <button onClick={handleLogOut} >cıkıs yap</button>
              {!user.emailVerifield &&     <button onClick={handleVerication} >e posta onayla</button> }
                 {/* <UpdateProfile/> */}
            
     <form className="form" onSubmit={handleSubmitt} >

        <div className="input-group">
       
          <input
            type="text"
            placeholder="todo yaz"
            name="todo"
   
            onChange={(e) => setTodo(e.target.value)}
          />
        </div>
        <button className="primary">ekle</button>
      </form>


            </div>

         


        )
        
    }

  return (
    <div>Home
        <Link to="/register">kayıt ol </Link>
        <Link to="/login"> giriş yap</Link>
       
    
    </div>
  )
}

export default Home