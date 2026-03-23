import { getUserPosts, getUserProfile } from "@/services/profile.service";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostCard from "@/components/post-card";
import { getUser } from "@/services/auth.service";
import { toggleFollow } from "@/services/social.service";
import { ArrowLeft } from "lucide-react";
import FollowButton from "@/components/follow-button";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState([true]);
  const [error, setError] = useState("");

  const currentUser = getUser();

  const loadProfile = async () => {
    try {
      setError("");
      const [profile, userPosts] = await Promise.all([
        getUserProfile(id),
        getUserPosts(id),
      ]);
      setUser(profile);
      setPosts(userPosts);
    } catch (err) {
      setError(err.message || "Failed to load user profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [id]);

  const handleFollowChange = async () => {
    if (!currentUser) {
      window.location.href = "/login";
      // redirecting to login page
      return;
    }

    const next = !user.following;
    setUser((prev) => ({
      ...prev,
      following: next,
      followers_count: Number(prev.followers_count) + (next ? 1 : -1),
    }));
    try {
      const res = await toggleFollow(
        user.user_id,
        next ? "follow" : "unfollow",
      );
      setUser((prev) => ({
        ...prev,
        following: res.following,
        followers_count: res.followers_count,
      }));
    } catch {
      loadProfile();
    }
  };

  if (loading)
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading profile...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-3 text-center px-6">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-xl">
          ⚠️
        </div>
        <p className="font-semibold text-gray-900 text-[15px] tracking-tight">
          Something went wrong
        </p>
        <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
          {error}
        </p>
        <button
          onClick={loadProfile}
          className="mt-2 px-5 py-2 rounded-full bg-gray-950 text-white text-sm font-semibold hover:bg-gray-700 transition-all duration-150"
        >
          Try again
        </button>
      </div>
    );

  const threads = posts.filter((p) => !p.parent_id);
  const replies = posts.filter((p) => !!p.parent_id);

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-6">
      <div className="relative w-full hidden md:flex items-center justify-center mb-4 shrink-0">
        {currentUser.user_id !== user.user_id && (
          <button
            onClick={() => navigate(-1)}
            className="absolute left-4.5 top-[50%] -translate-y-1/2 w-6 h-6 p-1 flex items-center justify-center transition-all duration-150 bg-white border border-black/10 rounded-full hover:scale-105 hover:shadow-sm"
          >
            <ArrowLeft size={18} className="text-gray-800" />
          </button>
        )}
        <h1 className="hidden md:inline-block text-[15px] font-medium mb-4 shrink-0">
          {currentUser.user_id === user.user_id ? "Profile" : user.username}
        </h1>
      </div>

      <div className="w-full md:bg-white md:border md:border-black/10 md:rounded-3xl md:shadow-xs">
        <div className="px-6 pt-6 pb-5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0 pr-4">
              <h2 className="md:text-[24px] text-[20px] tracking-tight text-gray-900 leading-tight font-bold capitalize">
                {user.username}
              </h2>
              <p className="text-sm text-gray-400 mt-0.5">@{user.username}</p>
            </div>
            <div className="md:w-21 md:h-21 w-18 h-18 rounded-full bg-gradient-to-br from-gray-700 to-gray-500 flex items-center justify-center text-white font-bold text-lg md:text-xl">
              {user.username?.[0].toUpperCase()}
            </div>
          </div>
          <p className="mt-5 text-gray-400">{user.followers_count} followers</p>
          <FollowButton user={user} onFollowChange={handleFollowChange} />
        </div>
      </div>

      <Tabs defaultValue="threads" className="w-full">
        <TabsList className="w-full rounded-none border-b border-black/[0.06] bg-transparent h-11 p-0 gap-0">
          {["threads", "replies"].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="flex-1 py-3 font-medium capitalize rounded-none text-black/40 bg-transparent shadow-none border-0 outline-none ring-0 border-b  border-b-black/20 data-[state=active]:text-black data-[state=active]:border-b-black data-[state=active]:bg-transparent data-[state=active]:!shadow-none transition-all duration-200"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="threads">
          {threads.length > 0 ? (
            <div className="animate-[fadeIn_0.3s_ease]">
              {threads.map((post, index) => (
                <div key={post.post_id}>
                  <PostCard
                    post={post}
                    onDelete={(id) =>
                      setPosts((prev) => prev.filter((p) => p.post_id !== id))
                    }
                  />
                  {index < threads.length - 1 && (
                    <div className="mx-5 border-b border-black/20" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-6 py-14">
              <p className="text-sm text-gray-400">No threads yet</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="replies">
          {replies.length > 0 ? (
            <div className="animate-[fadeIn_0.3s_ease]">
              {replies.map((post, index) => (
                <div key={post.post_id}>
                  <PostCard
                    post={post}
                    onDelete={(id) =>
                      setPosts((prev) => prev.filter((p) => p.post_id !== id))
                    }
                  />
                  {index < replies.length - 1 && (
                    <div className="mx-5 border-b border-black/20" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-6 py-14">
              <p className="text-sm text-gray-400">No replies yet</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
