const motes = Array.from({ length: 10 }, (_, index) => index)

function TavernEffects({ children }) {
  return (
    <div className="tavern-scene-layer tavern-scene-layer--effects tavern-effects" data-layer="effectsLayer" aria-hidden="true">
      <div className="tavern-effects__motes">
        {motes.map((mote) => <i key={mote} style={{ '--mote-index': mote }} />)}
      </div>
      {children}
    </div>
  )
}

export default TavernEffects
