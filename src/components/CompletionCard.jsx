function formatDuration(durationSeconds) {
  const minutes = Math.floor(durationSeconds / 60)
  const seconds = durationSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function CompletionCard({ recommendation, durationSeconds, experienceReward, saved, onToggleSaved }) {
  return (
    <section
      className="completion-card"
      style={{
        '--completion-primary': recommendation.palette[0],
        '--completion-secondary': recommendation.palette[1],
        '--completion-highlight': recommendation.palette[2],
      }}
    >
      <div className="completion-card__sparkles" aria-hidden="true"><i>✦</i><i>·</i><i>✦</i></div>
      <header className="completion-card__header">
        <div className="completion-card__seal" aria-hidden="true">✓</div>
        <div>
          <p>阶段 3 / 3 · 调酒完成</p>
          <h2>{recommendation.name}</h2>
          <span>{recommendation.englishName}</span>
        </div>
      </header>

      <div className="completion-card__flavors">
        {recommendation.flavors.map((flavor) => <span key={flavor}>{flavor}</span>)}
      </div>

      <div className="completion-card__summary">
        <div>
          <small>制作时间</small>
          <strong>{formatDuration(durationSeconds)}</strong>
        </div>
        <div>
          <small>制作奖励</small>
          <strong>+{experienceReward} EXP</strong>
        </div>
        <div>
          <small>调酒记录</small>
          <strong>制作次数 +1</strong>
        </div>
      </div>

      <div className="completion-card__recipe">
        <h3><span>✦</span> 今晚的完整配方</h3>
        <ul>
          {recommendation.ingredients.map((ingredient) => (
            <li key={`${ingredient.name}-${ingredient.amount}`}>
              <span>{ingredient.name}</span><i /><strong>{ingredient.amount}</strong>
            </li>
          ))}
        </ul>
      </div>

      <div className="completion-card__reward-note">
        <span aria-hidden="true">🐭</span>
        <p><strong>奖励已经存入我的酒馆</strong>调酒次数和酒馆等级进度已同步更新。</p>
      </div>

      <button
        className={`completion-card__favorite${saved ? ' is-saved' : ''}`}
        type="button"
        aria-pressed={saved}
        onClick={onToggleSaved}
      >
        <span aria-hidden="true">{saved ? '★' : '☆'}</span>
        {saved ? '已收藏到我的酒馆' : '收藏这杯酒'}
      </button>
    </section>
  )
}

export default CompletionCard
