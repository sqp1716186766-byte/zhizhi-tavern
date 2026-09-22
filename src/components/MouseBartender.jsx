import MouseCharacter from './MouseCharacter.jsx'
import MouseSpeech from './MouseSpeech.jsx'
import { CHARACTER_PROFILE } from '../services/characterService.js'
import TavernEffects from './TavernEffects.jsx'
import TavernLighting from './TavernLighting.jsx'
import TavernScene from './TavernScene.jsx'

function MouseBartender({ imageSrc, renderCharacter, state }) {
  return (
    <div className="bartender-stage">
      <TavernScene
        state={state}
        background={(
          <div className="bartender-stage__sign">
            <span>本店老板</span>
            <strong>吱 福</strong>
          </div>
        )}
        character={(
          <div className="mouse-bartender" role="img" aria-label={`${CHARACTER_PROFILE.name}正在吧台调酒`}>
            {renderCharacter || (imageSrc
              ? <img className="mouse-bartender__image" src={imageSrc} alt="花枝鼠老板吱福" />
              : <MouseCharacter state={state} className="mouse-bartender__image" alt="" />)}
          </div>
        )}
        foreground={(
          <>
            <div className="bar-tools" aria-hidden="true">
              <span className="cocktail-shaker">▰</span>
              <span className="cocktail-glass">🍸</span>
              <span className="bar-spoon">╱</span>
            </div>
            <div className="bartender-stage__counter" />
          </>
        )}
        lighting={<TavernLighting><div className="bartender-stage__spotlight" /><div className="bartender-stage__halo" /></TavernLighting>}
        effects={<TavernEffects><div className="bartender-stage__floor-glow" /></TavernEffects>}
        speech={!imageSrc && !renderCharacter ? <MouseSpeech state={state} /> : null}
      />
    </div>
  )
}

export default MouseBartender
