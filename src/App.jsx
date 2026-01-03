import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from './components/Card';

const App =  () => {
  
  const [userData, setUserData] = useState([]);
  const [indx, setIndx] = useState(1)

  const getData = async ()=>{
    const response = await axios.get(`https://picsum.photos/v2/list?page=${indx}&limit=20`)
    setUserData(response.data)
  }
  
  useEffect(()=>{
    getData()
  },[indx ])

  let printUserData = <h3 className='text-4xl text-gray-100 absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2'>Loading.....</h3> 
  if(userData.length > 0){
    printUserData = userData.map((elem,idx)=>{
      return <div key={idx}>
              <Card elem={elem}/>
            </div>
          
      
    })
  }
  return (
    <div className='h-screen overflow-auto w-full bg-gray-900'>
      <h1 className='text-3xl text-gray-100 font-bold text-center py-6'>Welcome to Image Gallery</h1>
      <div className='flex h-[82%] flex-wrap gap-3 pl-8 '>
        {printUserData}
      </div>
      <div className='flex justify-center items-center p-4 gap-6 fixed left-[50%] -translate-x-1/2 -translate-y-1/2'>
        <button 
        style={{opacity:indx==1?0.5:1}}
        onClick={()=>{
          if(indx>1){
            setIndx(indx-1)
            setUserData([])
          }
          
         }
        }
          className='bg-gray-300 text-gray-950 rounded-xl text-sm font-semibold px-6 py-3 cursor-pointer active:scale-95' >
          Prev
        </button>

        <h3 className='text-xl text-gray-100'>Page {indx}</h3>
        <button
          onClick={()=>{
              setIndx(indx+1)
              setUserData([])
            }
          } 
          className='bg-gray-300 text-gray-950 rounded-xl text-sm font-semibold px-6 py-3 cursor-pointer active:scale-95 '>
          Next
        </button>
      </div>
    </div>
  )
}

export default App