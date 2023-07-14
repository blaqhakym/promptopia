"use client"

import {useEffect, useState} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

import Profile from '@components/Profile'


function ProfilePage() {

  const [posts, setPosts] = useState([])
  const {data: session} = useSession()
const router = useRouter()


  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await res.json();

        //  console.log(data)
      setPosts(data);
    };

    if (session?.user?.id) fetchPosts();
  }, []);

const handleEdit = (post)=>{
router.push(`/update-prompt?id=${post._id}`)
}

const handleDelete = async(postToDelete)=>{
  const hasConfirmed = confirm("Are you sure you want to delete this post?")

try {
if(hasConfirmed){
  await fetch(`/api/prompt/${postToDelete._id.toString()}`,{
    method: "DELETE"
  } )
}
  const filteredPosts = posts.filter(p=>p._id !== postToDelete._id)

  setPosts(filteredPosts)
} catch (error) {
  console.log(error)
}
  
}

  return (
    <Profile
    name="My"
    desc="Welcome to your personalized profile page"
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    />
  )
}

export default ProfilePage