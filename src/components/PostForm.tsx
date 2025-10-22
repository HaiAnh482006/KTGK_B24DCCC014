import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Post } from "../types";

interface Props {
  posts?: Post[]; 
  onSubmit?: (data: Omit<Post, "id" | "createdAt">) => void; 
  onUpdate?: (updated: Post) => void; 
}

const PostForm: React.FC<Props> = ({ posts, onSubmit, onUpdate }) => {
  
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  
  const existingPost = id ? posts?.find((p) => p.id === id) : undefined;

  const [title, setTitle] = useState(existingPost?.title || "");
  const [content, setContent] = useState(existingPost?.content || "");


  useEffect(() => {
    if (existingPost) {
      setTitle(existingPost.title);
      setContent(existingPost.content);
    }
  }, [existingPost]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 

    if (!title || !content) {
      alert("Vui lòng nhập đủ thông tin!");
      return;
    }

    if (existingPost && onUpdate) {
    
      onUpdate({
        ...existingPost,
        title,
        content,
      });
      alert("Cập nhật thành công!");
    } else if (onSubmit) {
      onSubmit({
        title,
        content,
        author: "Ẩn danh", 
        thumbnail: "https://via.placeholder.com/150", 
        category: "Chưa phân loại", 
      });
      alert("Đăng bài thành công!");
    }

    navigate("/");
  };

  return (
    <div className="container">
      <h2>{existingPost ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Tiêu đề:</label>
          <input
            type="text"
            value={title}
            placeholder="Nhập tiêu đề bài viết"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label>Nội dung:</label>
          <textarea
            value={content}
            placeholder="Nhập nội dung bài viết"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button type="submit">
          {existingPost ? "Cập nhật" : "Đăng bài"}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
