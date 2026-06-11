import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function ProtectedRoute() {
  const { authLoading, isAuthenticated } = useAuth()
  const location = useLocation()

  if (authLoading) {
    return (
      <div className="page">
        <div className="panel page-message">Chargement de l espace de gestion...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}

export default ProtectedRoute
