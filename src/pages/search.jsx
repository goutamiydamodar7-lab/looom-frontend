import { searchQuery } from "@/services/search.service";
import {
  SearchIcon,
  SlidersHorizontal,
  SlidersHorizontalIcon,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const debounceRef = useRef(null);

  useEffect(() => {
    if (!query.trim()) {
      setUsers([]);
      setPosts([]);
      setError("");
      return;
    }

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const data = await searchQuery(query.trim());
        console.log(data);
        setUsers(data.users ?? []);
        setPosts(data.posts ?? []);
      } catch (err) {
        setError(err || "Search failed");
        setUsers([]);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }, 350);
    return () => clearTimeout(debounceRef.current);
  }, [query]);
  const hasResults = users.length > 0 || posts.length > 0;
  return (
    <div className="min-h-screen w-full flex flex-col items-center py-6 px-4">
      <h1 className="text-[15px] font-medium mb-4 shrink-0">Search</h1>

      <div className="w-full max-w-180 bg-white border border-black/10 rounded-4xl shadow-xs sticky z-10">
        <div className="px-4 py-3 border-b border-black/10">
          <div className="flex items-center gap-3.5 bg-gray-100 rounded-xl border border-black/20 px-5 py-3">
            <SearchIcon size={18} className="text-gray-400 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              autoFocus
              className="flex-1 text-[15px] text-gray-900 placeholder:text-gray-400 bg-transparent outline-none"
            />
            <button className="text-gray-400 hover:text-gray-600 transition-colors srink-0 cursor-pointer">
              <SlidersHorizontalIcon size={18} />
            </button>
          </div>
        </div>
        {/* TODO:Loading */}
        {/* Todo:error */}
        {/* TODO:Empty Query */}
        {/* TODO:No results */}
        {/* TODO:Results with Shandcn Tabs */}
      </div>
    </div>
  );
};

export default Search;
