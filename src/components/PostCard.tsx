import React from 'react'
import { Post } from '../types'
import { useNavigate } from 'react-router-dom'


interface Props {
post: Post
onDelete: (id: string) => void
}


const PostCard: React.FC<Props> = ({ post, onDelete }) => {
const navigate = useNavigate()
const short = post.content.slice(0, 100)
return (
<div style={{ border: '1px solid #ddd', padding: 8, borderRadius: 6 }}>
<img src={post.thumbnail} alt={post.title} style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 6 }} />
<h3>{post.title}</h3>
<div style={{ fontSize: 12, color: '#555' }}>{post.author} - {new Date(post.createdAt).toLocaleDateString()}</div>
<p>{short}...</p>
<div style={{ display: 'flex', gap: 8 }}>
<button onClick={() => navigate(`/posts/${post.id}`)}>Đọc thêm</button>
<button onClick={() => navigate(`/posts/edit/${post.id}`)}>Sửa</button>
<button onClick={() => onDelete(post.id)}>Xóa</button>
</div>
</div>
)
}


export default PostCard