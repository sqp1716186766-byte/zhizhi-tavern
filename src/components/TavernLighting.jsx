function TavernLighting({ children }) {
  return (
    <div className="tavern-scene-layer tavern-scene-layer--lighting tavern-lighting" data-layer="lightingLayer" aria-hidden="true">
      <div className="tavern-lighting__halo" />
      <div className="tavern-lighting__shade" />
      {children}
    </div>
  )
}

export default TavernLighting
