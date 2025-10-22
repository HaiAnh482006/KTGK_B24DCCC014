import React, { useState } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import PostForm from "./components/PostForm";
import { Post } from "./types";

const App: React.FC = () => {
  const navigate = useNavigate();

  
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      title: "Giới thiệu về ReactJS",
      author: "Nguyễn Văn A",
      thumbnail: "https://picsum.photos/200/120?1",
      category: "Công nghệ",
      content: "ReactJS là thư viện JavaScript mạnh mẽ để xây dựng giao diện người dùng.",
      createdAt: new Date().toLocaleDateString(),
    },
    {
      id: "2",
      title: "Du lịch Đà Lạt mùa thu",
      author: "Trần Thị B",
      thumbnail: "https://picsum.photos/200/120?2",
      category: "Du lịch",
      content: "Đà Lạt luôn là điểm đến hấp dẫn với khí hậu mát mẻ và cảnh sắc tuyệt đẹp.",
      createdAt: new Date().toLocaleDateString(),
    },
    {
      id: "3",
      title: "Cách pha cà phê ngon tại nhà",
      author: "Lê Văn C",
      thumbnail: "https://picsum.photos/200/120?3",
      category: "Ẩm thực",
      content: "Pha cà phê ngon không khó, chỉ cần biết chọn hạt và thời gian chiết xuất hợp lý.",
      createdAt: new Date().toLocaleDateString(),
    },
  ]);

 
  const addPost = (data: Omit<Post, "id" | "createdAt">) => {
    const newPost: Post = {
      id: Date.now().toString(),
      createdAt: new Date().toLocaleDateString(),
      ...data,
    };
    setPosts([newPost, ...posts]);
  };


  const deletePost = (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa bài viết này?")) {
      setPosts(posts.filter((p) => p.id !== id));
      navigate("/");
    }
  };


  const updatePost = (id: string, data: Omit<Post, "id" | "createdAt">) => {
    setPosts(
      posts.map((p) =>
        p.id === id ? { ...p, ...data } : p
      )
    );
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
     
      <nav
        style={{
          background: "#007bff",
          padding: "12px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
        }}
      >
        <h2 style={{ margin: 0 }}>📰 Blog App</h2>
        <div>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              color: isActive ? "#ffe600" : "white",
              marginRight: "20px",
              textDecoration: "none",
              fontWeight: "bold",
            })}
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/create"
            style={({ isActive }) => ({
              color: isActive ? "#ffe600" : "white",
              textDecoration: "none",
              fontWeight: "bold",
            })}
          >
            ✍️ Viết bài
          </NavLink>
        </div>
      </nav>

      
      <Routes>
        <Route
          path="/"
          element={<PostList posts={posts} onDelete={deletePost} />}
        />
        <Route
          path="/create"
          element={<PostForm onSubmit={addPost} />}
        />
        <Route
          path="/posts/:id"
          element={<PostDetail posts={posts} onDelete={deletePost} />}
        />
        <Route
          path="/posts/edit/:id"
          element={<PostForm posts={posts} onUpdate={updatePost} />}
        />
      </Routes>
    </div>
  );
};

export default App;
