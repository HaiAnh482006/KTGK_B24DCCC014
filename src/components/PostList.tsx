import React, { useState } from 'react'
import { Post } from '../types'
import PostCard from './PostCard'


interface Props {
posts: Post[]
onDelete: (id: string) => void
}


const PostList: React.FC<Props> = ({ posts, onDelete }) => {
const [filter, setFilter] = useState('')


const filtered = posts.filter(p => p.title.toLowerCase().includes(filter.toLowerCase()))


return (
<div>
<h2>Danh sách bài viết ({filtered.length})</h2>
<div style={{ margin: '8px 0' }}>
<input placeholder="Tìm theo tiêu đề" value={filter} onChange={e => setFilter(e.target.value)} />
</div>


<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
{filtered.map(p => (
<PostCard key={p.id} post={p} onDelete={onDelete} />
))}
</div>
</div>
)
}


export default PostList