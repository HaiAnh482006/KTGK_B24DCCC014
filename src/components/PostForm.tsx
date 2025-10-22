import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Post } from "../types";

interface Props {
  onSubmit?: (data: Omit<Post, "id" | "createdAt">) => void;
  onUpdate?: (id: string, data: Omit<Post, "id" | "createdAt">) => void;
  posts?: Post[];
}

const PostForm: React.FC<Props> = ({ onSubmit, onUpdate, posts }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const existingPost = id ? posts?.find((p) => p.id === id) : undefined;

  const [title, setTitle] = useState(existingPost?.title || "");
  const [author, setAuthor] = useState(existingPost?.author || "");
  const [thumbnail, setThumbnail] = useState(existingPost?.thumbnail || "");
  const [category, setCategory] = useState(existingPost?.category || "");
  const [content, setContent] = useState(existingPost?.content || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      title,
      author,
      thumbnail,
      category,
      content,
    };

    if (id && onUpdate) {
      onUpdate(id, data);
      alert("✅ Cập nhật bài viết thành công!");
    } else if (onSubmit) {
      onSubmit(data);
      alert("✅ Đăng bài thành công!");
    }

    navigate("/");
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#333",
        }}
      >
        📝 Thông tin bài viết
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "12px" }}>
          <label>Tiêu đề:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "6px" }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Tác giả:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "6px" }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Ảnh minh họa (link):</label>
          <input
            type="text"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            placeholder="https://..."
            style={{ width: "100%", padding: "8px", borderRadius: "6px" }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Danh mục:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "6px" }}
          >
            <option value="">-- Chọn danh mục --</option>
            <option value="Công nghệ">Công nghệ</option>
            <option value="Giáo dục">Giáo dục</option>
            <option value="Thể thao">Thể thao</option>
            <option value="Giải trí">Giải trí</option>
          </select>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Nội dung:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={5}
            style={{ width: "100%", padding: "8px", borderRadius: "6px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            fontWeight: "bold",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          💾 Lưu bài viết
        </button>
      </form>
    </div>
  );
};

export default PostForm;
