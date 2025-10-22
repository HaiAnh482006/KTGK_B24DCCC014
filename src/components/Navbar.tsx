import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'


const Navbar: React.FC = () => {
const navigate = useNavigate()
return (
<nav style={{ background: '#0b5', padding: '10px 16px' }}>
<div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center' }}>
<div style={{ marginRight: '16px', cursor: 'pointer' }} onClick={() => navigate('/') }>
<strong>MyBlog</strong>
</div>
<div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
<NavLink to="/" end style={({ isActive }) => ({ textDecoration: 'none', padding: 8, background: isActive ? '#fff' : 'transparent', borderRadius: 6 })}>
Trang chủ
</NavLink>
<NavLink to="/posts/create" style={({ isActive }) => ({ textDecoration: 'none', padding: 8, background: isActive ? '#fff' : 'transparent', borderRadius: 6 })}>
Viết bài
</NavLink>
</div>
</div>
</nav>
)
}


export default Navbar