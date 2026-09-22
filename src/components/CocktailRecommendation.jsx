import { CHARACTER_PROFILE } from '../services/characterService.js'

function CocktailRecommendation({ recommendation, onStartMixing }) {
  if (!recommendation) {
    return (
      <div className="recommendation-empty">
        <span aria-hidden="true">✦</span>
        <p>配方纸还空着</p>
        <small>写下材料，老板就会为你调出今晚的故事</small>
      </div>
    )
  }

  return (
    <section
      className="ai-recommendation"
      style={{
        '--recommendation-primary': recommendation.palette[0],
        '--recommendation-secondary': recommendation.palette[1],
        '--recommendation-highlight': recommendation.palette[2],
      }}
    >
      <header className="ai-recommendation__header">
        <div className="ai-recommendation__glass" aria-hidden="true">
          <span>▽</span>
          <i />
          <b>✦</b>
        </div>
        <div>
          <p>老板今晚推荐</p>
          <h2>{recommendation.name}</h2>
          <span>{recommendation.englishName}</span>
        </div>
      </header>

      <div className="ai-recommendation__flavors">
        {recommendation.flavors.map((flavor) => <span key={flavor}>{flavor}</span>)}
      </div>

      <p className="ai-recommendation__description">{recommendation.description}</p>

      <div className="ai-recommendation__reason">
        <span aria-hidden="true">🐭</span>
        <div><small>为什么推荐它？</small><p>{recommendation.reason}</p></div>
      </div>

      <div className="ai-recommendation__recipe">
        <div>
          <h3><span>01</span> 配方比例</h3>
          <ul>
            {recommendation.ingredients.map((ingredient) => (
              <li key={`${ingredient.name}-${ingredient.amount}`}>
                <span>{ingredient.name}</span><i /><strong>{ingredient.amount}</strong>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3><span>02</span> 制作步骤</h3>
          <ol>
            {recommendation.steps.map((step, index) => (
              <li key={step}><span>{index + 1}</span><p>{step}</p></li>
            ))}
          </ol>
        </div>
      </div>

      <blockquote className="ai-recommendation__note">
        <span>{CHARACTER_PROFILE.name}说</span>
        “{recommendation.ownerNote}”
      </blockquote>

      {onStartMixing && (
        <button className="ai-recommendation__start" type="button" onClick={onStartMixing}>
          <span aria-hidden="true">🍸</span>
          开始制作
          <i aria-hidden="true">→</i>
        </button>
      )}
    </section>
  )
}

export default CocktailRecommendation
