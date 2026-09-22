import { Link, Navigate, useParams } from 'react-router-dom'

import CocktailArtwork from '../components/CocktailArtwork.jsx'
import { cocktails, getCocktailById } from '../data/cocktails.js'
import { useFavorites } from '../utils/useFavorites.js'

function CocktailDetail() {
  const { id } = useParams()
  const cocktail = getCocktailById(id)
  const { isFavorite, toggleFavorite } = useFavorites()

  if (!cocktail) {
    return <Navigate replace to="/cocktails" />
  }

  const cocktailIndex = cocktails.findIndex((item) => item.id === cocktail.id) + 1
  const favorite = isFavorite(cocktail.id)

  return (
    <article className="detail-page">
      <div className="detail-page__glow" aria-hidden="true" />

      <div className="detail-shell">
        <div className="detail-actions">
          <Link className="detail-back" to="/cocktails">← 返回酒谱</Link>
          <span>酒谱编号 · {String(cocktailIndex).padStart(2, '0')}</span>
        </div>

        <section className="detail-hero">
          <div className="detail-hero__art">
            <CocktailArtwork cocktail={{ ...cocktail, index: cocktailIndex }} large />
          </div>

          <div className="detail-hero__copy">
            <div className="detail-hero__tags">
              {cocktail.categories.map((category) => <span key={category}>{category}</span>)}
            </div>
            <p className="detail-hero__english">{cocktail.englishName}</p>
            <h1>{cocktail.name}</h1>
            <p className="detail-hero__story">{cocktail.history}</p>

            <div className="detail-hero__stats">
              <div><span>难度</span><strong>{cocktail.difficulty}</strong></div>
              <div><span>酒精度</span><strong>{cocktail.abv}</strong></div>
              <div><span>风味</span><strong>{cocktail.flavors.join(' · ')}</strong></div>
            </div>

            <button
              className={`detail-favorite${favorite ? ' is-favorite' : ''}`}
              type="button"
              aria-pressed={favorite}
              onClick={() => toggleFavorite(cocktail.id)}
            >
              <span aria-hidden="true">{favorite ? '♥' : '♡'}</span>
              {favorite ? '已收入我的酒馆' : '收藏这杯酒'}
            </button>
          </div>
        </section>

        <section className="recipe-board">
          <div className="recipe-panel recipe-panel--ingredients">
            <div className="recipe-panel__title">
              <span>01</span>
              <div><small>INGREDIENTS</small><h2>材料比例</h2></div>
            </div>
            <ul className="ingredient-list">
              {cocktail.ingredients.map((ingredient) => (
                <li key={`${ingredient.name}-${ingredient.amount}`}>
                  <span>{ingredient.name}</span>
                  <i />
                  <strong>{ingredient.amount}</strong>
                </li>
              ))}
            </ul>
          </div>

          <div className="recipe-panel recipe-panel--steps">
            <div className="recipe-panel__title">
              <span>02</span>
              <div><small>METHOD</small><h2>制作步骤</h2></div>
            </div>
            <ol className="step-list">
              {cocktail.steps.map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <aside className="owner-comment">
          <div className="owner-comment__avatar" aria-hidden="true">🐭</div>
          <div>
            <p>吱福老板 · 私房点评</p>
            <blockquote>“{cocktail.ownerNote}”</blockquote>
          </div>
          <span className="owner-comment__stamp" aria-hidden="true">吱<br />选</span>
        </aside>
      </div>
    </article>
  )
}

export default CocktailDetail
