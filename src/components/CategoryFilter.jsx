function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="category-filter">
      <div className="category-list">
        <button
          type="button"
          className={selectedCategory === 'Toutes' ? 'chip active' : 'chip'}
          onClick={() => onCategoryChange('Toutes')}
        >
          Toutes
        </button>

        {categories.filter(Boolean).map((category) => (
          <button
            key={category}
            type="button"
            className={selectedCategory === category ? 'chip active' : 'chip'}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryFilter
