import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Card } from '../components/post-card/post-card'
import { api } from '../services'


export const HomePage = () => {
  const [value, setValue] = useState(0)
  const [data, setData] = useState(null)
  const [isFetched, setIsFetched] = useState(false)

  useEffect(() => {
    setIsFetched(false)
    api.getPosts().then(res => {
      setData(res?.data);
      setIsFetched(true)
    })
  }, [])

  if(!isFetched) return 'Loading...'  

  return (
    <div className='wrapper'>
        {data.map(el => (
            <Card post={el}/>
        ))}
    </div>
  )
}
