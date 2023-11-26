"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
      const fetchedPosts = response.data;
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      toast.success("Post deleted successfully!");
    } catch (error) {
      console.error(`Error deleting post with ID ${postId}:`, error);
      toast.error("Failed to delete post.");
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {posts.map((post) => (
          <div key={post.id} className="relative p-6 rounded-md border border-black">
            <button className="absolute top-0 right-0 p-2 focus:outline-none" onClick={() => handleDelete(post.id)}>
              <MdDelete size={20} />
            </button>
            <h2 className="text-xl text-blue-700 font-semibold mb-2">{post.title}</h2>
            <p className="text-black">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
