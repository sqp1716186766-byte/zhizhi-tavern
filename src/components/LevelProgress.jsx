function LevelProgress({ label, value, max, levelLabel }) {
  const safeMax = Math.max(max, 1)
  const percentage = Math.min(100, Math.max(0, (value / safeMax) * 100))

  return (
    <div className="level-progress">
      <div className="level-progress__heading">
        <div>
          <span>{label}</span>
          {levelLabel && <strong>{levelLabel}</strong>}
        </div>
        <b>{value}<small> / {max}</small></b>
      </div>
      <div
        className="level-progress__track"
        role="progressbar"
        aria-label={label}
        aria-valuemin="0"
        aria-valuemax={max}
        aria-valuenow={value}
      >
        <span style={{ width: `${percentage}%` }}>
          {percentage > 0 && <i aria-hidden="true">✦</i>}
        </span>
      </div>
    </div>
  )
}

export default LevelProgress
