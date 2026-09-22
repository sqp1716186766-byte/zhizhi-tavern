import { useCallback, useEffect, useRef, useState } from 'react'

import AIChatBox from '../components/AIChatBox.jsx'
import CompletionCard from '../components/CompletionCard.jsx'
import CocktailRecommendation from '../components/CocktailRecommendation.jsx'
import MixingProcess from '../components/MixingProcess.jsx'
import MouseThinking from '../components/MouseThinking.jsx'
import { growthRules } from '../data/user.js'
import { recommendCocktail } from '../services/aiService.js'
import { CHARACTER_STATES, setCharacterState } from '../services/characterService.js'
import { isCreationSaved, recordMixSession, toggleSavedCreation } from '../services/mixingService.js'
import { recordCompletedMix } from '../services/userService.js'

function AILab() {
  const [ingredients, setIngredients] = useState('')
  const [recommendation, setRecommendation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [flowPhase, setFlowPhase] = useState('recommendation')
  const [mixDuration, setMixDuration] = useState(0)
  const [creationSaved, setCreationSaved] = useState(false)
  const [mixingCharacterState, setMixingCharacterState] = useState(CHARACTER_STATES.POURING)
  const requestId = useRef(0)
  const completionHandled = useRef(false)

  const requestRecommendation = async (useRandom = false) => {
    const currentRequestId = ++requestId.current
    setLoading(true)
    setError('')
    setFlowPhase('recommendation')
    setMixDuration(0)
    completionHandled.current = false

    try {
      const result = await recommendCocktail(useRandom ? [] : ingredients)
      if (currentRequestId === requestId.current) {
        setRecommendation(result)
        setCreationSaved(isCreationSaved(result.id))
      }
    } catch {
      if (currentRequestId === requestId.current) setError('酒谱被风吹乱了，请再试一次。')
    } finally {
      if (currentRequestId === requestId.current) setLoading(false)
    }
  }

  const startMixing = () => {
    if (!recommendation) return
    completionHandled.current = false
    setMixingCharacterState(CHARACTER_STATES.POURING)
    setMixDuration(0)
    setFlowPhase('preparing')
  }

  const completeMixing = useCallback((durationSeconds) => {
    if (!recommendation || completionHandled.current) return

    completionHandled.current = true
    recordMixSession(recommendation, durationSeconds)
    recordCompletedMix()
    setMixDuration(durationSeconds)
    setFlowPhase('completed')
  }, [recommendation])

  const toggleCreationSaved = () => {
    if (!recommendation) return
    setCreationSaved(toggleSavedCreation(recommendation))
  }

  const characterState = loading
    ? CHARACTER_STATES.THINKING
    : flowPhase === 'mixing'
      ? mixingCharacterState
      : flowPhase === 'completed'
        ? CHARACTER_STATES.HAPPY
        : CHARACTER_STATES.IDLE

  useEffect(() => {
    setCharacterState(characterState)
  }, [characterState])

  const interactionLocked = loading || flowPhase === 'mixing'

  return (
    <section className="ai-lab-page">
      <div className="ai-lab-ambient" aria-hidden="true">
        <span className="ai-lab-ambient__moon" />
        <span className="ai-lab-ambient__beam" />
        <div className="ai-lab-ambient__bottles">
          {['#5e8e70', '#925247', '#b88d45', '#526f8f', '#754b78', '#aa6c3c'].map((color, index) => (
            <i key={color} style={{ '--lab-bottle': color, '--lab-delay': `${index * -0.7}s` }} />
          ))}
        </div>
        <span className="ai-lab-ambient__table" />
      </div>

      <div className="ai-lab-shell">
        <header className="ai-lab-hero">
          <div>
            <p>MAGICAL MIXOLOGY · LOCAL RULE ENGINE</p>
            <h1>吱吱调酒实验室</h1>
            <span>告诉老板你的酒柜，鼠鼠帮你创造今晚的一杯</span>
          </div>
          <div className="ai-lab-hero__badge"><span>✦</span> AI 试营业</div>
        </header>

        <div className="ai-lab-workbench">
          <div className="ai-lab-workbench__input">
            <MouseThinking thinking={loading} />
            <AIChatBox
              value={ingredients}
              loading={interactionLocked}
              onChange={setIngredients}
              onRecommend={() => requestRecommendation(false)}
              onRandom={() => requestRecommendation(true)}
            />
            {error && <p className="ai-lab-error" role="alert">{error}</p>}
          </div>

          <div className={`ai-lab-workbench__result ai-lab-workbench__result--${flowPhase}${loading ? ' is-loading' : ''}`}>
            {loading ? (
              <div className="recommendation-loading" role="status">
                <div className="recommendation-loading__flask" aria-hidden="true"><span /></div>
                <p>老板正在翻阅酒谱...</p>
                <small>闻一闻、尝一尝，再撒一点鼠鼠的灵感</small>
                <div><i /><i /><i /></div>
              </div>
            ) : flowPhase === 'completed' && recommendation ? (
              <CompletionCard
                recommendation={recommendation}
                durationSeconds={mixDuration}
                experienceReward={growthRules.completedMixXp}
                saved={creationSaved}
                onToggleSaved={toggleCreationSaved}
              />
            ) : (flowPhase === 'preparing' || flowPhase === 'mixing') && recommendation ? (
              <MixingProcess
                recommendation={recommendation}
                phase={flowPhase}
                onConfirmIngredients={() => setFlowPhase('mixing')}
                onComplete={completeMixing}
                onCharacterStateChange={setMixingCharacterState}
              />
            ) : (
              <CocktailRecommendation recommendation={recommendation} onStartMixing={recommendation ? startMixing : undefined} />
            )}
          </div>
        </div>

        <p className="ai-lab-footnote">
          <span aria-hidden="true">◇</span> 当前由本地酒谱规则生成，不会上传或保存你的材料
        </p>
      </div>
    </section>
  )
}

export default AILab
