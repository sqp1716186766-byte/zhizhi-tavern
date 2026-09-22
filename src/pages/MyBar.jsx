import LevelProgress from '../components/LevelProgress.jsx'
import MouseProfile from '../components/MouseProfile.jsx'
import TavernRoom from '../components/TavernRoom.jsx'
import { getLevelInfo, growthRules, mouseLevels, tavernLevels } from '../data/user.js'
import { useUserProfile } from '../utils/useUserProfile.js'

function MyBar() {
  const { user, changeAvatar } = useUserProfile()
  const mouseLevel = getLevelInfo(user.stats.mixologyXp, mouseLevels)
  const tavernLevel = getLevelInfo(user.tavern.experience, tavernLevels)
  const currentLevelXp = Math.max(0, user.tavern.experience - tavernLevel.minXp)
  const nextLevelTarget = tavernLevel.nextXp - tavernLevel.minXp
  const experienceRemaining = Math.max(0, nextLevelTarget - currentLevelXp)

  return (
    <section className="my-bar-page">
      <div className="my-bar-ambient" aria-hidden="true"><span /><span /><span /></div>

      <div className="my-bar-shell">
        <header className="my-bar-hero">
          <div>
            <p>MY SQUEAKY STORY · LOCAL SAVE</p>
            <h1>我的酒馆</h1>
            <span>从一只见习调酒鼠开始，把这里经营成装满故事的温暖酒馆。</span>
          </div>
          <div className="my-bar-save-status"><i /> 本地存档已开启</div>
        </header>

        <div className="my-bar-layout">
          <MouseProfile user={user} levelInfo={mouseLevel} onAvatarChange={changeAvatar} />

          <section className="tavern-growth-card">
            <header className="profile-section-title">
              <div><span aria-hidden="true">🏠</span><div><small>MY TAVERN</small><h2>我的酒馆</h2></div></div>
              <span>成长空间 · 001</span>
            </header>

            <TavernRoom tavernLevel={tavernLevel} />

            <div className="tavern-growth-card__progress">
              <LevelProgress
                label="酒馆经验值"
                value={currentLevelXp}
                max={nextLevelTarget}
                levelLabel={`Lv.${tavernLevel.level} ${tavernLevel.title}`}
              />
              <p className="tavern-upgrade-hint">
                <span aria-hidden="true">✦</span>
                再获得 {experienceRemaining} EXP，酒馆就能迎来下一次扩建
              </p>
            </div>

            <div className="growth-rules">
              <div><span aria-hidden="true">▤</span><p>收藏酒谱<strong>+{growthRules.favoriteRecipeXp} EXP</strong></p></div>
              <div><span aria-hidden="true">🍸</span><p>完成调酒<strong>+{growthRules.completedMixXp} EXP</strong></p></div>
              <div className="growth-rules__locked"><span aria-hidden="true">🔒</span><p>下一等级<strong>解锁新装潢</strong></p></div>
            </div>
          </section>
        </div>

        <footer className="my-bar-footer-note">
          <span aria-hidden="true">✦</span>
          收藏图鉴中的酒谱会自动计入成长；调酒完成记录将在后续功能中接入。
        </footer>
      </div>
    </section>
  )
}

export default MyBar
