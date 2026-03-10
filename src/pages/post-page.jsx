import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { api } from '../services'

export const PostPage = () => {
  const {postId} = useParams() 
  const [post, setPost] = useState(null)
  const [isFetched, setIsFetched] = useState(false)

  useEffect(() => {
    if(postId){
        api.getPostByld(postId).then(res => {
            setPost(res.data)
            setIsFetched(true)
        })
    }
  }, [postId])

  if(!isFetched) return <p>Loading...</p>

  return (
    <div>
        PostPage: {postId}
        <NavLink to={'/'}>Домой</NavLink>
    </div>
  )
}
