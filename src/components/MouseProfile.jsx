import { useState } from 'react'

import { avatarOptions } from '../data/user.js'

function MouseAvatar({ avatar }) {
  const fur = avatarOptions.fur.find((item) => item.id === avatar.fur) || avatarOptions.fur[0]
  const outfit = avatarOptions.outfit.find((item) => item.id === avatar.outfit) || avatarOptions.outfit[0]

  return (
    <div
      className={`profile-mouse profile-mouse--${avatar.hat}`}
      style={{ '--profile-fur': fur.color, '--profile-patch': fur.patch, '--profile-outfit': outfit.color }}
      role="img"
      aria-label={`${fur.label}花枝鼠，穿着${outfit.label}`}
    >
      <span className="profile-mouse__tail" />
      <span className="profile-mouse__body" />
      <span className="profile-mouse__outfit"><i>ZZ</i></span>
      <span className="profile-mouse__ear profile-mouse__ear--left" />
      <span className="profile-mouse__ear profile-mouse__ear--right" />
      <span className="profile-mouse__head">
        <i className="profile-mouse__patch" />
        <i className="profile-mouse__eye profile-mouse__eye--left" />
        <i className="profile-mouse__eye profile-mouse__eye--right" />
        <i className="profile-mouse__nose" />
        <i className="profile-mouse__whisker profile-mouse__whisker--left" />
        <i className="profile-mouse__whisker profile-mouse__whisker--right" />
      </span>
      {avatar.hat !== 'no-hat' && <span className="profile-mouse__hat" />}
    </div>
  )
}

function OptionGroup({ title, type, options, selected, onSelect }) {
  return (
    <fieldset className="avatar-option-group">
      <legend>{title}</legend>
      <div>
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className={selected === option.id ? 'is-selected' : ''}
            aria-pressed={selected === option.id}
            onClick={() => onSelect({ [type]: option.id })}
          >
            {option.color ? <i style={{ background: option.color }} /> : <i>{option.symbol}</i>}
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </fieldset>
  )
}

function MouseProfile({ user, levelInfo, onAvatarChange }) {
  const [editing, setEditing] = useState(false)

  const stats = [
    { icon: '✦', label: '调酒经验', value: user.stats.mixologyXp },
    { icon: '▤', label: '收藏酒谱', value: user.stats.favoriteRecipes },
    { icon: '⌁', label: '制作次数', value: user.stats.completedMixes },
  ]

  return (
    <section className="mouse-profile-card">
      <header className="profile-section-title">
        <div><span aria-hidden="true">🐭</span><div><small>MY BARTENDER</small><h2>我的调酒鼠</h2></div></div>
        <span>身份卡 · 001</span>
      </header>

      <div className="mouse-profile-card__main">
        <div className="mouse-profile-card__portrait">
          <span className="mouse-profile-card__halo" />
          <MouseAvatar avatar={user.avatar} />
          <span className="mouse-profile-card__badge">Lv.{levelInfo.level}</span>
        </div>

        <div className="mouse-profile-card__identity">
          <p>PLAYER BARTENDER</p>
          <h3>{user.displayName}</h3>
          <span>Lv.{levelInfo.level} · {levelInfo.title}</span>
        </div>
      </div>

      <div className="mouse-profile-stats">
        {stats.map((stat) => (
          <div key={stat.label}>
            <span aria-hidden="true">{stat.icon}</span>
            <div><small>{stat.label}</small><strong>{stat.value}</strong></div>
          </div>
        ))}
      </div>

      <button className="change-avatar-button" type="button" aria-expanded={editing} onClick={() => setEditing((value) => !value)}>
        <span aria-hidden="true">✎</span>
        {editing ? '收起形象衣柜' : '更换形象'}
      </button>

      {editing && (
        <div className="avatar-editor">
          <p><span>✦</span> 形象衣柜 <small>选择后自动保存</small></p>
          <OptionGroup title="毛色" type="fur" options={avatarOptions.fur} selected={user.avatar.fur} onSelect={onAvatarChange} />
          <OptionGroup title="衣服" type="outfit" options={avatarOptions.outfit} selected={user.avatar.outfit} onSelect={onAvatarChange} />
          <OptionGroup title="帽子" type="hat" options={avatarOptions.hat} selected={user.avatar.hat} onSelect={onAvatarChange} />
        </div>
      )}
    </section>
  )
}

export default MouseProfile
