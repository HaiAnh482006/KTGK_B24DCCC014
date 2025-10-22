import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Post } from '../types'


interface Props {
posts: Post[]
onDelete: (id: string) => void
}


const PostDetail: React.FC<Props> = ({ posts, onDelete }) => {
const { id } = useParams()
const navigate = useNavigate()
const post = posts.find(p => p.id === id)


if (!post) return <div>Bài viết không tồn tại</div>


return (
<div>
<button onClick={() => navigate(-1)}>Quay lại</button>
<h1>{post.title}</h1>
<div style={{ color: '#555' }}>{post.author} - {new Date(post.createdAt).toLocaleDateString()}</div>
<img src={post.thumbnail} alt={post.title} style={{ width: '100%', maxHeight: 400, objectFit: 'cover', marginTop: 8 }} />
<div style={{ marginTop: 12 }}>
<p>{post.content}</p>
</div>
<div style={{ display: 'flex', gap: 8 }}>
<button onClick={() => navigate(`/posts/edit/${post.id}`)}>Chỉnh sửa</button>
<button onClick={() => onDelete(post.id)}>Xóa bài viết</button>
</div>
</div>
)
}


export default PostDetail