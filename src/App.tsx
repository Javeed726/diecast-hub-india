import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './features/home/HomePage';
import { AdminPage } from './features/admin/AdminPage';
import { usePins } from './hooks/usePins';
import { PinsProvider } from './context/PinsContext';

function AppContent() {
  const { pinCount } = usePins();

  return (
    <div className="min-h-screen bg-surface-950 flex flex-col">
      <div className="flex-grow">
        <Navbar pinCount={pinCount} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/login" element={<AdminPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <PinsProvider>
        <AppContent />
      </PinsProvider>
    </BrowserRouter>
  );
}

export default App;
