import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PWAInstallPrompt from './components/ui/PWAInstallPrompt';
import KeyboardShortcutsHelp from './components/ui/KeyboardShortcutsHelp';
import Home from './pages/Home';
import TripPlanner from './pages/TripPlanner';
import ItineraryView from './pages/ItineraryView';
import SavedTrips from './pages/SavedTrips';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

function AppContent() {
  useKeyboardShortcuts();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plan" element={<TripPlanner />} />
          <Route path="/itinerary" element={<ItineraryView />} />
          <Route path="/saved" element={<SavedTrips />} />
        </Routes>
      </main>
      <Footer />
      <PWAInstallPrompt />
      <KeyboardShortcutsHelp />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
