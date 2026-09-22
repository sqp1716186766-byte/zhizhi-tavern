function CategoryFilter({ categories, selectedCategory, onChange }) {
  return (
    <div className="category-filter" aria-label="按鸡尾酒分类筛选">
      {categories.map((category) => (
        <button
          key={category}
          className={`category-filter__button${selectedCategory === category ? ' is-active' : ''}`}
          type="button"
          aria-pressed={selectedCategory === category}
          onClick={() => onChange(category)}
        >
          <span aria-hidden="true">✦</span>
          {category}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
