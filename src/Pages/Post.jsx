import React, { useEffect, useState } from 'react'
import {Button, Container} from '../components'
import { useSelector } from 'react-redux'
import post_service from '../appwrite/post_service'
import file_service from '../appwrite/file_service'
import { useParams, Link, useNavigate } from 'react-router-dom'
import parse from 'html-react-parser'

function Post() {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()
    const userData = useSelector((state)=> state.auth.userData)
    const isAuthor = post && userData ? post.userid == userData.$id : false
    useEffect(()=>{
        if(slug)
            post_service.getPost(slug).then((post)=>{
                if(post)
                    setPost(post)
        })
        else
        navigate("/")
    },[])

    const deletePost = function(){
        if(post)
            post_service.deletePost(post.$id).then((result)=>{
                if(result){
                    file_service.deleteFile(post.featuredImage)
                    navigate("/")
                }
                    
        })
    }
  return post ? (
    <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={file_service.getPreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}

export default Post