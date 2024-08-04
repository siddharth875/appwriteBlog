import React, { useEffect, useState } from 'react'
import post_service from '../appwrite/post_service'
import { PostCard, Container } from '../components'

function Home() {
    const [post, setPost] = useState([])
    useEffect(() => {
        post_service.listPosts().then((posts) => {
            if (posts)
                setPost(posts.documents)
        })
    }, [])
    if (post.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

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

export default Home