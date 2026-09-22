const particles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${6 + ((index * 17) % 89)}%`,
  delay: `${(index % 7) * -0.8}s`,
  duration: `${5 + (index % 5)}s`,
  size: `${2 + (index % 3)}px`,
}))

const bottles = ['#95683a', '#56715d', '#8c4b3c', '#65765b', '#b08445', '#71414b']

function TavernBackground() {
  return (
    <div className="tavern-scene" aria-hidden="true">
      <div className="tavern-scene__wall" />
      <div className="tavern-scene__beam tavern-scene__beam--top" />
      <div className="tavern-scene__beam tavern-scene__beam--left" />
      <div className="tavern-scene__window">
        <span className="moon" />
        <span className="window-cross window-cross--vertical" />
        <span className="window-cross window-cross--horizontal" />
      </div>

      <div className="hanging-lamp hanging-lamp--left">
        <span className="hanging-lamp__cord" />
        <span className="hanging-lamp__shade" />
        <span className="hanging-lamp__glow" />
      </div>
      <div className="hanging-lamp hanging-lamp--right">
        <span className="hanging-lamp__cord" />
        <span className="hanging-lamp__shade" />
        <span className="hanging-lamp__glow" />
      </div>

      <div className="bottle-shelf bottle-shelf--high">
        {bottles.map((color, index) => (
          <span key={index} className="shelf-bottle" style={{ '--bottle-color': color }} />
        ))}
      </div>
      <div className="bottle-shelf bottle-shelf--low">
        {bottles.slice().reverse().map((color, index) => (
          <span key={index} className="shelf-bottle" style={{ '--bottle-color': color }} />
        ))}
      </div>

      <div className="tavern-bar">
        <span className="tavern-bar__edge" />
        <span className="tavern-bar__panel tavern-bar__panel--one" />
        <span className="tavern-bar__panel tavern-bar__panel--two" />
        <span className="tavern-bar__panel tavern-bar__panel--three" />
      </div>

      <div className="tavern-scene__vignette" />
      <div className="tavern-particles">
        {particles.map((particle) => (
          <span
            key={particle.id}
            style={{
              '--particle-left': particle.left,
              '--particle-delay': particle.delay,
              '--particle-duration': particle.duration,
              '--particle-size': particle.size,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default TavernBackground
