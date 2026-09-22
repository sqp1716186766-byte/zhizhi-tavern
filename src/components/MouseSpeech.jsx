import { useSyncExternalStore } from 'react'

import {
  getCharacterDefinition,
  getCharacterState,
  CHARACTER_PROFILE,
  resolveCharacterState,
  subscribeCharacterState,
} from '../services/characterService.js'

function MouseSpeech({ state, message, title = CHARACTER_PROFILE.name }) {
  const managedState = useSyncExternalStore(
    subscribeCharacterState,
    getCharacterState,
    getCharacterState,
  )
  const activeState = resolveCharacterState(state || managedState)
  const definition = getCharacterDefinition(activeState)

  return (
    <div className={`mouse-thinking__speech mouse-speech mouse-speech--${activeState}`}>
      <strong><span aria-hidden="true">🐭</span> {title}</strong>
      <p key={`${activeState}-${message || definition.speech}`}>{message || definition.speech}</p>
    </div>
  )
}

export default MouseSpeech
