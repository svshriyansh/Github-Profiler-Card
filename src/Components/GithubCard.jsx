import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
const authToken = import.meta.env.VITE_AUTH_TOKEN;


export default function GithubCard(){
    console.log(authToken);
    const [username,setUsername] = useState("");
    const [userData,setUserData] = useState("");
    const [inputValue, setInputValue] = useState("");
    useEffect(()=>{
        axios.get(`https://api.github.com/users/${username}`,{
            headers:{
                Authorization: `${authToken}`
            }
        })
        .then(data => setUserData(data))
        .catch(error => console.log(error))
    },[username])

    const GithubProfile = useCallback(({data})=>{
        // console.log("data -->", data);
        return(
            <div className="flex flex-col justify-center h-full"> 
            <div className='flex justify-center m-10'>
                <div className="bg-white shadow-lg shadow-white transition ease-in-out delay-150 hover:scale-110 duration-1000 rounded-lg overflow-hidden max-w-80 ">
    
                    <div className="relative">
                        <div className="absolute left-[112px] top-[120px]">
                            <img src={data?.data?.avatar_url} alt="" className="h-24 w-24 rounded-full "/>
                        </div>
                        <div className="h-44 w-80">
                            <img src='images.webp' alt="" className="h-44 w-80"/>
                        </div>
                        <div className="h-36 w-80 bg-white ">
                            <div className="flex flex-col h-full justify-center items-center">
                                <div className="details flex justify-between space-x-2">
                                    <div className="name font-serif font-semibold">{data?.data?.name}</div>
                                    <div className="age font-serif text-slate-400">24</div>
                                </div>
                                <div className="location font-serif text-slate-400">
                                    Bengaluru
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="h-14 w-80 bg-white flex justify-around items-center">
                        <div >
                            <div className="flex flex-col items-center font-semibold">80K</div>
                            <div className="text-xs font-thin flex flex-col items-center ">Followers</div>
                        </div>
                        <div>
                            <div className="font-semibold flex flex-col items-center ">803K</div>
                            <div className="text-xs font-thin flex flex-col items-center ">Likes</div>
                        </div>
                        <div>
                            <div className="flex flex-col items-center font-semibold">1.4K</div>
                            <div className="text-xs font-thin flex flex-col items-center ">Photos</div>
                        </div>
                    </div>
                    <hr />
                </div>
            </div>
    
    </div>
        )
    },[username])

    function onChange(value){
        setInputValue(value)
    }
    function handleClick(){
        setUsername(inputValue)
    }
    console.log("userData is --> ",userData);
    function EmptyComp(){
        return <div></div>
    }
  return(
        <div className='flex flex-col h-screen'>

            <div className='flex  w-full gap-3 justify-end mt-2'>   
                <input type="text" name="input" placeholder='Enter github userName' className='w-1/6 h-11 border border-gray-300 ' onChange={e=> onChange(e.target.value) }/>
                <button className='w-24 h-11 border rounded-xl font-sans focus:outline-none bg-black text-white' onClick={handleClick}>Go</button>
            </div>

            {userData ?  <GithubProfile data={userData} />: <EmptyComp/>}
            
            
        </div>
  )  
  
}