import { useMemo, useState } from 'react'

import CategoryFilter from '../components/CategoryFilter.jsx'
import CocktailCard from '../components/CocktailCard.jsx'
import { cocktailCategories, cocktails } from '../data/cocktails.js'
import { useFavorites } from '../utils/useFavorites.js'

function Cocktails() {
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const { favorites, isFavorite, toggleFavorite } = useFavorites()

  const filteredCocktails = useMemo(() => {
    if (selectedCategory === '全部') return cocktails
    return cocktails.filter((cocktail) => cocktail.categories.includes(selectedCategory))
  }, [selectedCategory])

  return (
    <section className="collection-page">
      <div className="collection-page__ambient" aria-hidden="true">
        <span className="collection-page__lamp" />
        <span className="collection-page__shelf collection-page__shelf--one" />
        <span className="collection-page__shelf collection-page__shelf--two" />
      </div>

      <div className="collection-shell">
        <header className="collection-hero">
          <div className="collection-hero__copy">
            <p className="collection-hero__kicker">THE BARTENDER'S ARCHIVE · VOL. 01</p>
            <h1>老板的珍藏酒谱</h1>
            <p>翻开吱福老板的手写酒谱，收集属于你的二十杯经典故事。</p>
          </div>

          <div className="collection-status" aria-label={`已收藏 ${favorites.length} 杯，共 ${cocktails.length} 杯`}>
            <div className="collection-status__mouse" aria-hidden="true">🐭</div>
            <div>
              <span>图鉴进度</span>
              <strong>{favorites.length}<small> / {cocktails.length}</small></strong>
            </div>
          </div>
        </header>

        <div className="collection-toolbar">
          <CategoryFilter
            categories={cocktailCategories}
            selectedCategory={selectedCategory}
            onChange={setSelectedCategory}
          />
          <span className="collection-toolbar__count">本页 {filteredCocktails.length} 杯</span>
        </div>

        <div className="cocktail-grid">
          {filteredCocktails.map((cocktail) => (
            <CocktailCard
              key={cocktail.id}
              cocktail={{ ...cocktail, index: cocktails.indexOf(cocktail) + 1 }}
              isFavorite={isFavorite(cocktail.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Cocktails
