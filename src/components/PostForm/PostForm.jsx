import React, { useCallback, useEffect } from 'react'
import {Button, Input, RTE, Select} from '../'
import file_service from '../../appwrite/file_service'
import post_service from '../../appwrite/post_service'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({post}) {
    const navigate = useNavigate()
    const {register, handleSubmit, control, watch, setValue, getValues, reset} = useForm({
        defaultValues:{
            title : post?.title || "",
            slug : post?.$id || "",
            content : post?.content || "",
            featuredImage : post?.featuredImage || "",
            status : post?.status || "active",
        }
    })
    const userData = useSelector((state)=>(state.auth.userData))
    const submitHandler = async function(data){
        if(post){
            const file = data.image[0] ? await file_service.uploadFile(data.image[0]) : null
            if(file)
                file_service.deleteFile(post.featuredImage)
            const dbPost = await post_service.updatePost(post.$id, {
                ...data,
                featuredImage : file ? file.$id : post.featuredImage
            })
            if(dbPost)
                navigate(`/post/${dbPost.$id}`)
        }else{
            const file = data.image[0] ? await file_service.uploadFile(data.image[0]) : null
            data.featuredImage = file.$id ? file.$id : null
            const dbPost = await post_service.createPost({
                ...data,
                userid : userData.$id
            })
            if(dbPost)
                navigate(`/post/${dbPost.$id}`)
        }
    }
    const slugTransform = useCallback((value)=>{
        if(value && typeof value == "string")
            return value
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-zA-Z\d\s]+/g,"-")
                    .replace(/\s/g,"-")
        return ""
    },[])

    useEffect(()=>{
        const subscription = watch((value, {name})=>{
            if(name === "title")
                setValue("slug", slugTransform(value.title), {shouldValidate : true})
        })

        return () => subscription.unsubscribe();
    },[watch, setValue, slugTransform])

    useEffect(()=>{
        reset({
            title : post?.title || "",
            slug : post?.$id || "",
            content : post?.content || "",
            featuredImage : post?.featuredImage || "",
            status : post?.status || "active",
        })
    },[post])
  return (
    <div>
        <form onSubmit={handleSubmit(submitHandler)} className='flex flex-wrap'>
        <div className="w-2/3 px-2">
            <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", {
                required: true
            })}
            />
            <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", {
                required : true
            })}
            onInput ={(e)=>{
                setValue("slug", slugTransform(e.target.value), {shouldValidate : true})
            }}
            />
            <RTE
            label="Content :"
            name="content"
            control={control}
            defaultValues={getValues("content")}
            />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={file_service.getPreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    </div>
  )
}

export default PostForm