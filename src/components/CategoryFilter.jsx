function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <section className="filters-card">
      <div className="filter-heading">
        <h2>Categories</h2>
        <p>Le filtre se construit automatiquement a partir des produits disponibles.</p>
      </div>

      <div className="category-list">
        <button
          type="button"
          className={selectedCategory === 'Toutes' ? 'chip active' : 'chip'}
          onClick={() => onCategoryChange('Toutes')}
        >
          Toutes
        </button>

        {categories.map((category) => (
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
    </section>
  )
}

export default CategoryFilter
