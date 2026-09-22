const bottleColors = ['#6e8a66', '#ad6949', '#b18b4d', '#586d79', '#7c536c', '#a87e45']

function TavernRoom({ tavernLevel }) {
  return (
    <div className="tavern-room" data-tavern-level={tavernLevel.level} role="img" aria-label={`${tavernLevel.title}场景，包含吧台、酒柜和桌椅`}>
      <div className="tavern-room__upgrade-glow" />
      <div className="tavern-room__back-wall" />
      <div className="tavern-room__window"><span /></div>
      <div className="tavern-room__lamp"><i /><span /></div>
      <div className="tavern-room__shelf">
        {bottleColors.map((color) => <i key={color} style={{ '--room-bottle': color }} />)}
      </div>
      <div className="tavern-room__picture">吱<br />吱</div>
      <div className="tavern-room__bar"><span /><i /><i /><i /></div>
      <div className="tavern-room__table"><span /><i className="tavern-room__chair tavern-room__chair--left" /><i className="tavern-room__chair tavern-room__chair--right" /></div>
      <div className="tavern-room__stools"><i /><i /></div>
      <div className="tavern-room__floor" />
      <div className="tavern-room__label">
        <span>当前酒馆</span>
        <strong>Lv.{tavernLevel.level} {tavernLevel.title}</strong>
        <i aria-hidden="true">{'★'.repeat(Math.min(tavernLevel.level, 4))}{'☆'.repeat(Math.max(0, 4 - tavernLevel.level))}</i>
      </div>
      <div className="tavern-room__dust" aria-hidden="true">{Array.from({ length: 10 }, (_, index) => <i key={index} />)}</div>
    </div>
  )
}

export default TavernRoom
