import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ModernBlogPlatform from './Blog';
import AdminSection from './AdminSection';
import WriteAccessPage from './WriteAccessPage'; // Optional signup page

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<ModernBlogPlatform />} />
        
        {/* Admin route */}
        <Route path="/admin" element={<AdminSection />} />
        
        {/* Optional: Separate signup page */}
        <Route path="/write" element={<WriteAccessPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;