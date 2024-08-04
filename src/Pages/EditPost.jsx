import React, {useEffect, useState} from 'react'
import { Container,PostForm } from '../components'
import post_service from '../appwrite/post_service'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const [posts, setPosts] = useState()
    const navigate = useNavigate()
    const {slug} = useParams()
    useEffect(()=>{
         if(slug){
            post_service.getPost(slug).then((post)=>{
                if(post)
                    setPosts(post)
            })
         }else{
            navigate("/")
         }
    },[navigate, slug])
  return (
    <div>
        <Container>
            <PostForm post={posts} />
        </Container>
    </div>
  )
}

export default EditPost