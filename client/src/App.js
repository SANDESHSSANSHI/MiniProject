import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated import
import { GoogleOAuthProvider } from '@react-oauth/google';

// Components and context providers
import UserProvider from './context/UserProvider';
import AccountProvider from './context/AccountProvider';
import Loader from './components/loader/Loader';

const Messenger = lazy(() => import('./components/Messenger'));
const UploadPage = lazy(() => import('./components/chat/menu/UploadPage')); // Ensure this component exists

function App() {
  const clientId = '246648691460-bsj1rub53iami1btvii0577h1on2je01.apps.googleusercontent.com';

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <UserProvider>
        <AccountProvider>
          <Router>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/upload" element={<UploadPage />} /> {/* Updated usage */}
                <Route path="/" element={<Messenger />} />
              </Routes>
            </Suspense>
          </Router>
        </AccountProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
