import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

import {
  getCharacterDefinition,
  getCharacterState,
  preloadCharacterAssets,
  CHARACTER_RENDER_CONFIG,
  resolveCharacterState,
  subscribeCharacterState,
} from '../services/characterService.js'

const TRANSITION_DURATION = 360

function MouseCharacter({ state, mode = CHARACTER_RENDER_CONFIG.defaultMode, className = '', alt, ...imageProps }) {
  const { onError, ...restImageProps } = imageProps
  const managedState = useSyncExternalStore(
    subscribeCharacterState,
    getCharacterState,
    getCharacterState,
  )
  const activeState = resolveCharacterState(state || managedState)
  const activeDefinition = getCharacterDefinition(activeState, mode)
  const transitionId = useRef(0)
  const displayedState = useRef(activeState)
  const [layers, setLayers] = useState(() => [{
    id: transitionId.current,
    phase: 'active',
    state: activeState,
  }])

  useEffect(() => {
    preloadCharacterAssets(mode)
  }, [mode])

  useEffect(() => {
    if (displayedState.current === activeState) return undefined

    transitionId.current += 1
    const nextId = transitionId.current
    const previousState = displayedState.current
    displayedState.current = activeState
    setLayers((currentLayers) => {
      const previousLayer = currentLayers[currentLayers.length - 1] || {
        id: nextId - 1,
        state: previousState,
      }
      return [
        { ...previousLayer, phase: 'leaving' },
        { id: nextId, phase: 'entering', state: activeState },
      ]
    })

    const timer = window.setTimeout(() => {
      setLayers([{ id: nextId, phase: 'active', state: activeState }])
    }, TRANSITION_DURATION)

    return () => window.clearTimeout(timer)
  }, [activeState])

  const isDecorative = alt === ''

  const handleImageError = (event, fallbackAsset) => {
    const image = event.currentTarget
    if (image.dataset.fallbackApplied !== 'true') {
      image.dataset.fallbackApplied = 'true'
      image.src = fallbackAsset
    }
    onError?.(event)
  }

  return (
    <span
      className={`mouse-character mouse-character--${activeState} mouse-character--visual-${activeDefinition.visualState}${className ? ` ${className}` : ''}`}
      role={isDecorative ? undefined : 'img'}
      aria-hidden={isDecorative ? 'true' : undefined}
      aria-label={isDecorative ? undefined : (alt || activeDefinition.label)}
    >
      {layers.map((layer) => {
        const definition = getCharacterDefinition(layer.state, mode)
        return (
          <img
            {...restImageProps}
            key={layer.id}
            className={`mouse-character__image mouse-character__image--${layer.phase}`}
            src={definition.asset}
            onError={(event) => handleImageError(event, definition.fallbackAsset)}
            alt=""
            aria-hidden="true"
            draggable="false"
          />
        )
      })}
    </span>
  )
}

export default MouseCharacter
