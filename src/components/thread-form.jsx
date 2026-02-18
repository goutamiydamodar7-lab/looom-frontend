import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { createPost } from "@/services/posts.service";

const ThreadForm = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) return;
    try {
      setLoading(true);
      await createPost({ content });
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message || "unable to create post");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      className="bg-white rounded-b-2xl overflow-hidden w-full max-w-[620px]"
      onSubmit={handleSubmit}
    >
      <div className="flex gap-3 px-5 pt-4 ">
        <div className="flex flex-col items-center">
          <div className="h-9 w-9 rounded-full bg-gray-400 shrink-0"></div>
          <div className="w-[2px] grow bg-black/10 my-2 rounded-full"></div>
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Goutami</span>
          </div>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's new?"
            className="bg-transparent border-none p-0 focus-visible:ring-0 resize-none min-h-[80px] leading-relaxed placeholder-text:text-gray-500"
          />
        </div>
      </div>

      <div className="px-5 py-3 flex items-center justify-end border-t border-black/10">
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2 text-center">
            {errorMessage}
          </p>
        )}
        <Button
          type="submit"
          disabled={!content.trim()}
          className="bg-black text-white font-semibold text-sm cursor-pointer hover:bg-gray-800 disabled:opacity-50 px-6 rounded-full transition-all"
        >
          {loading ? "Posting..." : "Post"}
        </Button>
      </div>
    </form>
  );
};

export default ThreadForm;
