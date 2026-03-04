import PostCard from "@/components/post-card";
import ReplyForm from "@/components/reply-form";
import { getThread } from "@/services/posts.service";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Thread = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [replies, setReplies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadThread = async () => {
    try {
      const data = await getThread(id);
      setPost(data.post);
      setReplies(data.replies);
    } catch (err) {
      setError(err.message || "Failed to load message");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadThread();
  }, [id]);
  if (loading) return <p className="p-6 text-center">Loading post</p>;

  if (error) return <p className="p-6 text-center text-red-500">{error}</p>;
  const addReply = (reply) => {
    setReplies((prev) => [...prev, reply]);
  };

  return (
    <div className="w-full">
      <PostCard post={post} />
      <ReplyForm parentId={id} onReply={addReply} />
      <div>
        {replies.map((reply) => (
          <PostCard key={reply.post_id} post={reply} />
        ))}
      </div>
    </div>
  );
};

export default Thread;
