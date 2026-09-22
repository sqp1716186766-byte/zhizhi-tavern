import { useEffect, useState } from 'react'

import IngredientStep from './IngredientStep.jsx'
import { CHARACTER_PROFILE, CHARACTER_STATES } from '../services/characterService.js'

const mixingSteps = [
  { title: '加入基酒', detail: '让酒体先站稳脚步', characterState: CHARACTER_STATES.POURING },
  { title: '加入辅料', detail: '补上酸、甜与香气', characterState: CHARACTER_STATES.POURING },
  { title: '加冰', detail: '把今晚的温度降下来', characterState: CHARACTER_STATES.ADDING_ICE },
  { title: '摇晃雪克杯', detail: '听见冰块清脆碰撞', characterState: CHARACTER_STATES.SHAKING },
  { title: '装饰', detail: '为故事留下最后一笔', characterState: CHARACTER_STATES.GARNISHING },
]

const STEP_DURATION = 900

function MixingProcess({ recommendation, phase, onConfirmIngredients, onComplete, onCharacterStateChange }) {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    if (phase !== 'mixing') return undefined

    let nextStep = 0
    const startedAt = Date.now()
    setActiveStep(0)
    onCharacterStateChange?.(mixingSteps[0].characterState)

    const timer = window.setInterval(() => {
      nextStep += 1

      if (nextStep >= mixingSteps.length) {
        window.clearInterval(timer)
        onComplete(Math.max(1, Math.ceil((Date.now() - startedAt) / 1000)))
        return
      }

      setActiveStep(nextStep)
      onCharacterStateChange?.(mixingSteps[nextStep].characterState)
    }, STEP_DURATION)

    return () => window.clearInterval(timer)
  }, [phase, onComplete, onCharacterStateChange])

  const isPreparing = phase === 'preparing'

  return (
    <section className={`mixing-process mixing-process--${phase}`} aria-live="polite">
      <header className="mixing-process__header">
        <div>
          <p>TONIGHT'S MIX · {recommendation.englishName}</p>
          <h2>{isPreparing ? '先把材料摆上吧台' : '老板正在调酒...'}</h2>
        </div>
        <span>{isPreparing ? '阶段 1 / 3' : '阶段 2 / 3'}</span>
      </header>

      <div className="mixing-process__progress" aria-hidden="true">
        <i className="is-complete" />
        <i className={phase === 'mixing' ? 'is-active' : ''} />
        <i />
      </div>

      {isPreparing ? (
        <div className="mixing-process__preparation">
          <p>按酒谱准备以下材料。确认齐全后，{CHARACTER_PROFILE.name}就会正式开工。</p>
          <ol className="mixing-process__list">
            {recommendation.ingredients.map((ingredient, index) => (
              <IngredientStep
                key={`${ingredient.name}-${ingredient.amount}`}
                index={index}
                title={ingredient.name}
                detail={ingredient.amount}
                status="ready"
              />
            ))}
          </ol>
          <button className="mixing-process__confirm" type="button" onClick={onConfirmIngredients}>
            <span aria-hidden="true">✓</span>
            材料已备齐，开始调酒
          </button>
        </div>
      ) : (
        <div className="mixing-process__mixing">
          <div className="mixing-process__shaker" aria-hidden="true">
            <span>✦</span>
            <i />
          </div>
          <p className="mixing-process__active-copy">
            <small>NOW MIXING</small>
            {mixingSteps[activeStep].title}
          </p>
          <ol className="mixing-process__list">
            {mixingSteps.map((step, index) => (
              <IngredientStep
                key={step.title}
                index={index}
                title={step.title}
                detail={step.detail}
                status={index < activeStep ? 'complete' : index === activeStep ? 'active' : 'pending'}
              />
            ))}
          </ol>
        </div>
      )}
    </section>
  )
}

export default MixingProcess
