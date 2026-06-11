import { useEffect, useMemo, useRef, useState } from 'react'
import CategoryFilter from '../components/CategoryFilter'
import ProductCard from '../components/ProductCard'
import SearchBar from '../components/SearchBar'
import { getProducts } from '../services/firestoreService'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80'

function Home({ variant = 'home' }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Toutes')
  const catalogueRef = useRef(null)
  const showHero = variant === 'home'

  useEffect(() => {
    let isCancelled = false

    getProducts()
      .then((loadedProducts) => {
        if (!isCancelled) {
          setProducts(loadedProducts)
          setError('')
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setError('Le catalogue est temporairement indisponible.')
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setLoading(false)
        }
      })

    return () => {
      isCancelled = true
    }
  }, [])

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.categorie))].sort(),
    [products],
  )

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase()

    return products.filter((product) => {
      const combinedText = [
        product.nom,
        product.marque,
        product.categorie,
        ...(product.compatibilites ?? []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      const matchesSearch = combinedText.includes(normalizedSearch)
      const matchesCategory =
        selectedCategory === 'Toutes' || product.categorie === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [products, searchQuery, selectedCategory])

  function scrollToCatalogue() {
    catalogueRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="page">
      {showHero ? (
        <section className="hero-section">
          <div className="hero-copy-block">
            <span className="section-kicker">Catalogue professionnel</span>
            <h1>Trouvez les pieces adaptees a votre moto</h1>
            <p>
              Catalogue de pieces moto : freinage, pneus, transmission, eclairage
              et accessoires. Une selection rigoureuse de marques reconnues pour la
              fiabilite et la performance.
            </p>

            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onSubmit={scrollToCatalogue}
            />
          </div>

          <div className="panel hero-visual">
            <img src={HERO_IMAGE} alt="MotoParts hero" />
          </div>
        </section>
      ) : (
        <section className="catalogue-header">
          <h1>Catalogue complet</h1>
          <p>Filtrez par categorie ou recherchez par nom, marque ou modele.</p>
          <SearchBar value={searchQuery} onChange={setSearchQuery} compact />
        </section>
      )}

      <section className="catalog-section" ref={catalogueRef}>
        <div className="section-heading">
          <div>
            <h2>{showHero ? 'Notre catalogue' : 'Produits disponibles'}</h2>
            <p>{filteredProducts.length} piece(s) disponible(s)</p>
          </div>
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {loading ? <div className="panel page-message">Chargement du catalogue...</div> : null}
        {error ? <div className="form-feedback error">{error}</div> : null}

        {!loading && !error ? (
          filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="panel empty-panel">
              <h3>Aucun produit ne correspond a votre recherche.</h3>
              <p>Essayez une autre categorie ou un autre mot-cle.</p>
            </div>
          )
        ) : null}
      </section>
    </div>
  )
}

export default Home
