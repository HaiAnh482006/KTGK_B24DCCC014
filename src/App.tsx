import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostDetail from "./components/PostDetail";
import { Post } from "./types";

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      title: "Lập trình React cơ bản",
      author: "Nguyễn Văn A",
      thumbnail: "https://picsum.photos/300/200",
      category: "Công nghệ",
      content: "React là thư viện giúp xây dựng giao diện web nhanh chóng...",
      createdAt: "2025-10-22",
    },
    {
      id: "2",
      title: "Du lịch Đà Lạt mùa thu",
      author: "Trần Thị B",
      thumbnail: "https://picsum.photos/300/201",
      category: "Du lịch",
      content: "Đà Lạt luôn là điểm đến hấp dẫn với không khí trong lành...",
      createdAt: "2025-10-21",
    },
  ]);

  const addPost = (data: Omit<Post, "id" | "createdAt">) => {
    const newPost: Post = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setPosts([...posts, newPost]);
    alert("Đăng bài thành công!");
  };

  const deletePost = (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa bài viết này?")) {
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  const updatePost = (updated: Post) => {
    setPosts(posts.map((p) => (p.id === updated.id ? updated : p)));
    alert("Cập nhật thành công!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <Navbar />

      <Routes>
        <Route path="/" element={<PostList posts={posts} onDelete={deletePost} />} />
        <Route path="/create" element={<PostForm onSubmit={addPost} />} />
        <Route path="/posts/:id" element={<PostDetail posts={posts} onDelete={deletePost} />} />
        <Route path="/posts/edit/:id" element={<PostForm onUpdate={updatePost} />} />
      </Routes>
    </div>
  );
};

export default App;
