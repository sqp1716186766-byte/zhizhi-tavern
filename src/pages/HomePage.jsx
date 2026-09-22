import { useEffect } from 'react'

import MenuButton from '../components/MenuButton.jsx'
import MouseBartender from '../components/MouseBartender.jsx'
import TavernBackground from '../components/TavernBackground.jsx'
import { CHARACTER_PROFILE, CHARACTER_STATES, setCharacterState } from '../services/characterService.js'

const menuItems = [
  {
    icon: '🍸',
    label: '鸡尾酒图鉴',
    hint: '翻开酒单',
    to: '/cocktails',
  },
  {
    icon: '🧪',
    label: 'AI 调酒实验室',
    hint: '创造新配方',
    to: '/ai',
  },
  {
    icon: '🏠',
    label: '我的酒馆',
    hint: '回到收藏室',
    to: '/bar',
  },
]

function HomePage() {
  useEffect(() => {
    setCharacterState(CHARACTER_STATES.WELCOME)
    const welcomeTimer = window.setTimeout(() => {
      setCharacterState(CHARACTER_STATES.IDLE)
    }, 3000)

    return () => window.clearTimeout(welcomeTimer)
  }, [])

  return (
    <section className="tavern-home" aria-labelledby="welcome-title">
      <TavernBackground />

      <div className="tavern-home__content">
        <div className="welcome-panel">
          <div className="welcome-panel__kicker">
            <span aria-hidden="true">✦</span>
            今夜营业中
            <span aria-hidden="true">✦</span>
          </div>

          <p className="welcome-panel__eyebrow">THE SQUEAKY TAVERN</p>
          <h1 id="welcome-title">欢迎来到吱吱酒馆</h1>
          <p className="welcome-panel__subtitle">每一杯酒，都藏着一个故事</p>

          <div className="menu-grid" aria-label="酒馆主要入口">
            {menuItems.map((item) => (
              <MenuButton key={item.to} {...item} />
            ))}
          </div>

          <p className="welcome-panel__note">
            <span aria-hidden="true">●</span> {CHARACTER_PROFILE.name}今晚也在吧台等你
          </p>
        </div>

        <MouseBartender />
      </div>
    </section>
  )
}

export default HomePage
