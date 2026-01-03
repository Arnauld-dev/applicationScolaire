import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ToastContainer } from 'react-toastify'

// Pages d'authentification
import Login from './pages/auth/Login'
import ForgotPassword from './pages/auth/ForgotPassword'

// Page d'accueil
import Home from './pages/Home'

// Pages Dashboard
import DashboardEleve from './pages/dashboard/DashboardEleve'
import DashboardEnseignant from './pages/dashboard/DashboardEnseignant'
import DashboardAdmin from './pages/dashboard/DashboardAdmin'

// Pages Élève
import ProfilEleve from './pages/eleve/ProfilEleve'
import EmploiDuTemps from './pages/eleve/EmploiDuTemps'
import Notes from './pages/eleve/Notes'
import Devoirs from './pages/eleve/Devoirs'
import Bulletins from './pages/eleve/Bulletins'
import Paiements from './pages/eleve/Paiements'

// Pages Enseignant
import ProfilEnseignant from './pages/enseignant/ProfilEnseignant'
import Classes from './pages/enseignant/Classes'
import Eleves from './pages/enseignant/Eleves'
import NotesEnseignant from './pages/enseignant/Notes'
import NotesExcel from './pages/enseignant/NotesExcel'
import DevoirsEnseignant from './pages/enseignant/Devoirs'
import AnnoncesEnseignant from './pages/enseignant/Annonces'

// Pages Administration
import ProfilAdmin from './pages/admin/ProfilAdmin'
import GestionUtilisateurs from './pages/admin/GestionUtilisateurs'
import GestionAcademique from './pages/admin/GestionAcademique'
import GestionFinanciere from './pages/admin/GestionFinanciere'
import AnnoncesAdmin from './pages/admin/Annonces'

// Layout
import Layout from './components/global/Layout'

// Route protégée
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />
  }
  
  return children
}

function AppRoutes() {
  const { user, isAuthenticated } = useAuth()
  
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Routes protégées */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard par rôle */}
        <Route
          index
          element={
            user?.role === 'eleve' ? <DashboardEleve /> :
            user?.role === 'enseignant' ? <DashboardEnseignant /> :
            user?.role === 'admin' ? <DashboardAdmin /> :
            <Navigate to="/login" replace />
          }
        />
        
        {/* Routes Élève */}
        <Route
          path="eleve/profil"
          element={
            <ProtectedRoute allowedRoles={['eleve']}>
              <ProfilEleve />
            </ProtectedRoute>
          }
        />
        <Route
          path="eleve/emploi-du-temps"
          element={
            <ProtectedRoute allowedRoles={['eleve']}>
              <EmploiDuTemps />
            </ProtectedRoute>
          }
        />
        <Route
          path="eleve/notes"
          element={
            <ProtectedRoute allowedRoles={['eleve']}>
              <Notes />
            </ProtectedRoute>
          }
        />
        <Route
          path="eleve/devoirs"
          element={
            <ProtectedRoute allowedRoles={['eleve']}>
              <Devoirs />
            </ProtectedRoute>
          }
        />
        <Route
          path="eleve/bulletins"
          element={
            <ProtectedRoute allowedRoles={['eleve']}>
              <Bulletins />
            </ProtectedRoute>
          }
        />
        <Route
          path="eleve/paiements"
          element={
            <ProtectedRoute allowedRoles={['eleve']}>
              <Paiements />
            </ProtectedRoute>
          }
        />
        
        {/* Routes Enseignant */}
        <Route
          path="enseignant/profil"
          element={
            <ProtectedRoute allowedRoles={['enseignant']}>
              <ProfilEnseignant />
            </ProtectedRoute>
          }
        />
        <Route
          path="enseignant/classes"
          element={
            <ProtectedRoute allowedRoles={['enseignant']}>
              <Classes />
            </ProtectedRoute>
          }
        />
        <Route
          path="enseignant/eleves"
          element={
            <ProtectedRoute allowedRoles={['enseignant']}>
              <Eleves />
            </ProtectedRoute>
          }
        />
        <Route
          path="enseignant/notes"
          element={
            <ProtectedRoute allowedRoles={['enseignant']}>
              <NotesEnseignant />
            </ProtectedRoute>
          }
        />
        <Route
          path="enseignant/notes-excel"
          element={
            <ProtectedRoute allowedRoles={['enseignant']}>
              <NotesExcel />
            </ProtectedRoute>
          }
        />
        <Route
          path="enseignant/devoirs"
          element={
            <ProtectedRoute allowedRoles={['enseignant']}>
              <DevoirsEnseignant />
            </ProtectedRoute>
          }
        />
        <Route
          path="enseignant/annonces"
          element={
            <ProtectedRoute allowedRoles={['enseignant']}>
              <AnnoncesEnseignant />
            </ProtectedRoute>
          }
        />
        
        {/* Routes Administration */}
        <Route
          path="admin/profil"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <ProfilAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/utilisateurs"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <GestionUtilisateurs />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/academique"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <GestionAcademique />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/financiere"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <GestionFinanciere />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin/annonces"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AnnoncesAdmin />
            </ProtectedRoute>
          }
        />
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AuthProvider>
  )
}

export default App

