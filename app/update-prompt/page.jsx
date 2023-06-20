"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPatchPost] = useState({
    prompt: "",
    tag: [],
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "GET",
      });
      const data = await response.json();
      setPatchPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (promptId) getPromptDetails();
  }, [promptId]);

  const EditPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return alert("prompt ID not found try again");

    try {
      const response = await fetch(`api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPatchPost}
      submitting={submitting}
      handleSubmit={EditPrompt}
    />
  );
};

export default UpdatePrompt;
