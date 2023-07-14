"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {

       const body = {
         prompt: post.prompt,
         tag: post.tag,
         userId: session?.user.id,
       };

       
      const response = await fetch("/api/prompt/new", {
        method: "POST",
       body : JSON.stringify(body),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error, 'post not made');
    } finally {
      setSubmitting(false);
    }
  };



  
  return (
    <Form
      handleSubmit={createPrompt}
      type="Create"
      post={post}
      submitting={submitting}
      setPost={setPost}
    />
  );
};

export default CreatePrompt;
