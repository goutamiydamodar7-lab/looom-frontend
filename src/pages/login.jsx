import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(username);
    console.log(password);
  };
  return (
    <div className="flex flex-col items-center w-full animate-fade-in">
      <h1 className="font-bold text-[16px] mb-4 text-center">
        Login With Your Looom account
      </h1>
      <form onSubmit={handleLogin} className="w-full space-y-2">
        <Input
          type="text"
          placeholder="Username, phone or email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full h-14 px-4 py-4 rounded-lg focus-visible:ring-0 focus:border-black/40 transition-color duration-200"
        />

        <Input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full h-14 px-4 py-4 rounded-lg focus-visible:ring-0 focus:border-black/40 transition-color duration-200"
        />
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-14 p-4 rounded-lg bg-black/80 text-gray-400 hover:bg-black hover:text-white transition-all duration-200 cursor-pointer"
        >
          {loading ? "Logging in...." : "Login"}
        </Button>
      </form>
      <div className="mt-4 text-center">
        <a href="#" className="text-sm text-gray-500 hover:underline">
          Forgot Password?
        </a>
      </div>
      <div className="w-full flex items-center justify-center my-6">
        <div className="h-px bg-gray-700 grow"></div>
        <span className="px-4 text-gray-700 text-sm">or</span>
        <div className="h-px bg-gray-700 grow"></div>
      </div>
      <div className="w-full text-center">
        <Link to="/register" className="w-full block">
        <Button varient="secondary" type="button" className="w-full h-14 p-4 rounded-lg border border-black/20 bg-white hover:border-black/60 cursor-pointer hover:bg-white text-black">
            Create an account
        </Button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
