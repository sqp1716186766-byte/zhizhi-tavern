const motes = Array.from({ length: 16 }, (_, index) => ({
  id: index,
  left: `${4 + ((index * 23) % 93)}%`,
  delay: `${(index % 8) * -1.1}s`,
  duration: `${8 + (index % 5) * 1.4}s`,
  size: `${2 + (index % 3)}px`,
}))

function GlobalAtmosphere() {
  return (
    <div className="global-atmosphere" aria-hidden="true">
      <span className="global-atmosphere__warmth" />
      <span className="global-atmosphere__grain" />
      <div className="global-atmosphere__motes">
        {motes.map((mote) => (
          <i
            key={mote.id}
            style={{
              '--mote-left': mote.left,
              '--mote-delay': mote.delay,
              '--mote-duration': mote.duration,
              '--mote-size': mote.size,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default GlobalAtmosphere
