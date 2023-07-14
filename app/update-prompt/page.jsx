"use client";

import {useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");


  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      // console.log(data);
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const body = {
        prompt: post.prompt,
        tag: post.tag,
      };

      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error, "post not eidted");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      handleSubmit={updatePrompt}
      type="Edit"
      post={post}
      submitting={submitting}
      setPost={setPost}
    />
  );
};

export default EditPrompt;
