import { useSyncExternalStore } from 'react'

import {
  getCharacterDefinition,
  getCharacterState,
  resolveCharacterState,
  subscribeCharacterState,
} from '../services/characterService.js'
import MouseCharacter from './MouseCharacter.jsx'
import MouseSpeech from './MouseSpeech.jsx'
import TavernEffects from './TavernEffects.jsx'
import TavernScene from './TavernScene.jsx'

function MouseThinking({ thinking = false, state, message, status }) {
  const managedState = useSyncExternalStore(
    subscribeCharacterState,
    getCharacterState,
    getCharacterState,
  )
  const characterState = resolveCharacterState(state || (thinking ? 'thinking' : managedState))
  const definition = getCharacterDefinition(characterState)
  const isThinking = definition.visualState === 'thinking'

  return (
    <div
      className={`mouse-thinking is-${characterState} is-${definition.visualState}${isThinking ? ' is-thinking' : ''}`}
      aria-live="polite"
    >
      <TavernScene
        state={characterState}
        speech={<MouseSpeech state={characterState} message={message} />}
        character={<div className="mouse-thinking__character" aria-hidden="true"><MouseCharacter state={characterState} alt="" /></div>}
        effects={<TavernEffects><div className="mouse-thinking__bubbles"><span>·</span><span>·</span><span>✦</span></div></TavernEffects>}
      />
      <div className="mouse-thinking__status">
        <span className="mouse-thinking__dot" />
        {status || definition.status}
      </div>
    </div>
  )
}

export default MouseThinking
