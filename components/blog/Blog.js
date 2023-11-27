"use client";
import { MdDelete, MdEdit, MdAdd, MdClose } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedBody, setEditedBody] = useState("");
  const [showNewBlogForm, setShowNewBlogForm] = useState(false);
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogBody, setNewBlogBody] = useState("");

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
    } finally {
      setIsLoading(false);
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

  const handleEdit = (postId) => {
    const postToEdit = posts.find((post) => post.id === postId);
    setEditingPostId(postId);
    setEditedTitle(postToEdit.title);
    setEditedBody(postToEdit.body);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/posts/${editingPostId}`, {
        title: editedTitle,
        body: editedBody,
      });
      // Update the edited post in the state
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === editingPostId ? { ...post, title: editedTitle, body: editedBody } : post))
      );
      // Reset editing state
      setEditingPostId(null);
      setEditedTitle("");
      setEditedBody("");
      toast.success("Post edited successfully!");
    } catch (error) {
      console.error(`Error editing post with ID ${editingPostId}:`, error);
      toast.error("Failed to edit post.");
    }
  };

  const handleCreateNewBlog = async () => {
    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/posts", {
        title: newBlogTitle,
        body: newBlogBody,
        userId: 1,
      });

      const newPost = response.data;
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      setNewBlogTitle("");
      setNewBlogBody("");
      toast.success("Blog created successfully!");
      setShowNewBlogForm(false);
    } catch (error) {
      console.error("Error creating new blog:", error);
      toast.error("Failed to create new blog.");
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <ToastContainer />

      <div className="mb-4 flex items-center justify-between">
        <button onClick={() => setShowNewBlogForm(true)} className="p-2 focus:outline-none">
          <MdAdd size={20} className="text-green-500" />
          <h2 className="text-2xl font-bold text-center">Create a new blog</h2>
        </button>
        {showNewBlogForm && (
          <div>
            <MdClose size={20} className="text-gray-600 cursor-pointer" onClick={() => setShowNewBlogForm(false)} />
            <input
              type="text"
              value={newBlogTitle}
              onChange={(e) => setNewBlogTitle(e.target.value)}
              className="mb-2 px-2 py-1 border rounded w-full"
              placeholder="Blog title... "
            />
            <textarea
              value={newBlogBody}
              onChange={(e) => setNewBlogBody(e.target.value)}
              className="mb-2 px-2 py-1 border rounded w-full"
              placeholder="Write your blog... "
            />
            <button onClick={handleCreateNewBlog} className="bg-blue-500 text-white px-2 py-1 rounded">
              <FaRegSave size={18} className="mr-1" />
              Save
            </button>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader">
            Loading...
            <span className="animate-ellipsis">...</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="relative p-6 rounded-md border border-black hover:shadow-lg transition duration-300 ease-in-out"
            >
              <div className="flex items-center justify-end mb-2">
                {/* Edit Icon */}
                <button
                  className="p-2 mr-2 focus:outline-none"
                  onClick={() => handleEdit(post.id)}
                  disabled={editingPostId !== null}
                >
                  <MdEdit size={20} />
                </button>
                {/* Delete Icon */}
                <button className="p-2 focus:outline-none" onClick={() => handleDelete(post.id)}>
                  <MdDelete size={20} />
                </button>
              </div>
              {editingPostId === post.id ? (
                // Edit Mode
                <div>
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="mb-2 px-2 py-1 border rounded"
                    placeholder="Enter new title"
                  />
                  <textarea
                    value={editedBody}
                    onChange={(e) => setEditedBody(e.target.value)}
                    className="mb-2 px-2 py-1 border rounded"
                    placeholder="Enter new body"
                  />
                  <button onClick={handleSaveEdit} className="bg-blue-500 text-white px-2 py-1 rounded">
                    <FaRegSave size={18} className="mr-1" />
                    Save
                  </button>
                </div>
              ) : (
                // Display Mode
                <>
                  <h2 className="text-xl text-blue-700 font-semibold mb-2 hover:text-blue-800 transition duration-300">
                    {post.title}
                  </h2>
                  <p className="text-black">{post.body}</p>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
