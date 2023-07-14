"use client";

import { useEffect, useState } from "react";
import {useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

function otherProfile() {
  const [posts, setPosts] = useState([]);
  
  const searchParams = useSearchParams();
  const userId = searchParams.get("user");

  useEffect(() => {
    // console.log(userId);
    const fetchPosts = async () => {
      const res = await fetch(`/api/other/${userId}`);
      const data = await res.json();

      // console.log(data);
      setPosts(data);
    };

    if (userId) fetchPosts();
  }, []);

  return (
    <Profile
      name={userId.charAt(0).toUpperCase() + userId.slice(1) + "'s"}
      desc={`Welcome to ${userId.charAt(0).toUpperCase()}${userId.slice(1)}'s profile page`}
      data={posts}
    />
  );
}

export default otherProfile;
