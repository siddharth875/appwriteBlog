import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import post_service from '../appwrite/post_service'

function AllPosts() {
    const [post, setPost] = useState([])
    useEffect(() => {
        post_service.listPosts([]).then((post) => {
            if (post)
                setPost(post.documents)
        })
    }, [])
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {post.map((item) => (
                        <div key={item.$id} className='p-2 w-1/4'>
                            <PostCard {...item} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts