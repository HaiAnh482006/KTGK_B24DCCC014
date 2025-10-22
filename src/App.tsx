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
      content: "ReactJS là một thư viện JavaScript mạnh mẽ do Facebook phát triển, dùng để xây dựng giao diện người dùng một cách hiệu quả. Điểm nổi bật của ReactJS là cơ chế Virtual DOM giúp cập nhật thay đổi trên trang web nhanh chóng mà không cần tải lại toàn bộ. Ngoài ra, React còn hỗ trợ chia nhỏ giao diện thành các component độc lập, dễ tái sử dụng và bảo trì. Với cộng đồng lớn mạnh, thư viện phong phú và khả năng kết hợp TypeScript, ReactJS đang trở thành lựa chọn hàng đầu của lập trình viên front-end hiện nay.",
,
      createdAt: "2025-22-10",
    },
    {
      id: "2",
      title: "Du lịch Đà Lạt mùa thu",
      author: "Trần Thị B",
      thumbnail: "https://picsum.photos/200/120?2",
      category: "Du lịch",
      content: "Đà Lạt vào mùa thu mang một vẻ đẹp lãng mạn và bình yên đến lạ thường. Không khí se lạnh buổi sáng, nắng nhẹ buổi trưa và sương mờ buổi tối khiến du khách như lạc vào một bức tranh mộng mơ. Đây cũng là thời điểm hoa dã quỳ bắt đầu nở vàng rực rỡ khắp triền đồi, cùng với mùi hương dịu nhẹ của hoa oải hương lan tỏa trong gió. Du khách có thể dạo quanh hồ Xuân Hương, ghé thăm đồi chè Cầu Đất hay thưởng thức tách cà phê nóng giữa không gian yên tĩnh. Mùa thu Đà Lạt thật sự là khoảng thời gian lý tưởng để tận hưởng cuộc sống chậm rãi và tìm lại sự bình yên trong tâm hồn.",
      createdAt: "2025-22-10",
    },
    {
      id: "3",
      title: "Cách pha cà phê ngon tại nhà",
      author: "Lê Văn C",
      thumbnail: "https://picsum.photos/200/120?3",
      category: "Ẩm thực",
      content: "Pha một tách cà phê ngon tại nhà không hề khó nếu bạn biết cách chọn nguyên liệu và làm đúng kỹ thuật. Trước hết, hãy chọn loại cà phê nguyên chất, hạt rang vừa phải để giữ được hương thơm tự nhiên. Khi pha phin, nên tráng phin bằng nước sôi trước để giữ nhiệt, sau đó cho lượng cà phê vừa đủ và rót nước sôi nhẹ nhàng theo vòng tròn. Cà phê ngon sẽ nhỏ giọt từ từ, có màu nâu cánh gián và mùi thơm đậm đà. Nếu thích vị ngọt béo, bạn có thể thêm sữa đặc hoặc ít đá tùy khẩu vị. Một buổi sáng bắt đầu bằng tách cà phê tự tay pha sẽ khiến tinh thần tỉnh táo và tràn đầy năng lượng cho cả ngày.",
      createdAt: "2025-22-10",
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
