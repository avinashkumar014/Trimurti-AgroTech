import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { PartsListingPage } from '@/pages/PartsListingPage';
import { PartDetailPage } from '@/pages/PartDetailPage';
import { VehiclesListingPage } from '@/pages/VehiclesListingPage';
import { VehicleDetailPage } from '@/pages/VehicleDetailPage';
import { SellVehiclePage } from '@/pages/SellVehiclePage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tractor-parts" element={<PartsListingPage />} />
        <Route path="/tractor-parts/:id" element={<PartDetailPage />} />
        <Route path="/used-vehicles" element={<VehiclesListingPage />} />
        <Route path="/used-vehicles/:id" element={<VehicleDetailPage />} />
        <Route path="/sell-your-vehicle" element={<SellVehiclePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
