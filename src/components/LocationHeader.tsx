
import { MapPin } from 'lucide-react';

const LocationHeader = () => {
  return (
    <div className="flex items-center justify-center gap-2 text-white/90">
      <MapPin className="w-5 h-5" />
      <span className="text-lg">Paris, France</span>
    </div>
  );
};

export default LocationHeader;
