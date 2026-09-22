import MouseCharacter from './MouseCharacter.jsx'
import TavernEffects from './TavernEffects.jsx'
import TavernLighting from './TavernLighting.jsx'

function TavernScene({
  mode,
  state,
  className = '',
  background,
  character,
  foreground,
  lighting,
  effects,
  speech,
}) {
  return (
    <div className={`tavern-visual tavern-visual--${mode || 'scene'}${className ? ` ${className}` : ''}`}>
      <div className="tavern-scene-layer tavern-scene-layer--background" data-layer="backgroundLayer">{background}</div>
      <div className="tavern-scene-layer tavern-scene-layer--character" data-layer="characterLayer">
        {character || <MouseCharacter state={state} mode={mode} alt="" />}
      </div>
      <div className="tavern-scene-layer tavern-scene-layer--foreground" data-layer="foregroundLayer">{foreground}</div>
      {lighting || <TavernLighting />}
      {effects || <TavernEffects />}
      <div className="tavern-scene-layer tavern-scene-layer--speech" data-layer="speechLayer">{speech}</div>
    </div>
  )
}

export default TavernScene
