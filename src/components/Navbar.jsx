import { NavLink } from 'react-router-dom'

const navigation = [
  { icon: '⌂', label: '返回首页', to: '/' },
  { icon: '🍸', label: '鸡尾酒图鉴', to: '/cocktails' },
  { icon: '✦', label: 'AI 调酒实验室', to: '/ai' },
  { icon: '▣', label: '我的酒馆', to: '/bar' },
]

function Navbar() {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="主导航">
        <NavLink className="site-brand" to="/" aria-label="吱吱酒馆首页">
          <span aria-hidden="true">✦</span>
          <span>吱吱酒馆</span>
        </NavLink>
        <ul className="site-nav__links">
          {navigation.map((item) => (
            <li key={item.to}>
              <NavLink
                className={({ isActive }) =>
                  `site-nav__link${isActive ? ' is-active' : ''}`
                }
                to={item.to}
                aria-label={item.to === '/' ? '返回吱吱酒馆首页' : item.label}
              >
                <span className="site-nav__icon" aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
