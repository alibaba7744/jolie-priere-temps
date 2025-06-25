
import { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface LocationSelectorProps {
  currentLocation: string;
  onLocationChange: (location: string) => void;
}

const locations = [
  { value: 'paris', label: 'Paris, France' },
  { value: 'london', label: 'Londres, Royaume-Uni' },
  { value: 'madrid', label: 'Madrid, Espagne' },
  { value: 'berlin', label: 'Berlin, Allemagne' },
  { value: 'rome', label: 'Rome, Italie' },
  { value: 'amsterdam', label: 'Amsterdam, Pays-Bas' },
  { value: 'brussels', label: 'Bruxelles, Belgique' },
  { value: 'zurich', label: 'Zurich, Suisse' },
  { value: 'vienna', label: 'Vienne, Autriche' },
  { value: 'stockholm', label: 'Stockholm, Suède' },
];

const LocationSelector = ({ currentLocation, onLocationChange }: LocationSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(currentLocation);

  const handleLocationSelect = (value: string) => {
    const location = locations.find(loc => loc.value === value);
    if (location) {
      setSelectedLocation(location.label);
      onLocationChange(location.label);
      setOpen(false);
    }
  };

  const getCurrentLocationKey = () => {
    return locations.find(loc => loc.label === currentLocation)?.value || 'paris';
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-white/90 hover:text-white hover:bg-white/10 transition-colors"
        >
          <MapPin className="w-5 h-5" />
          <span className="text-lg">{currentLocation}</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm border-2 border-white/20 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-slate-800 text-xl">
            <MapPin className="w-6 h-6 text-indigo-600" />
            Choisir votre ville
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            Sélectionnez votre ville pour obtenir les horaires de prière précis.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          <Select value={getCurrentLocationKey()} onValueChange={handleLocationSelect}>
            <SelectTrigger className="w-full h-12 bg-white border-2 border-slate-200 hover:border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-slate-700">
              <SelectValue placeholder="Sélectionnez une ville" />
            </SelectTrigger>
            <SelectContent className="bg-white/98 backdrop-blur-sm border-2 border-slate-200 shadow-xl z-[100]">
              {locations.map((location) => (
                <SelectItem 
                  key={location.value} 
                  value={location.value}
                  className="hover:bg-indigo-50 focus:bg-indigo-100 text-slate-700 cursor-pointer py-3 px-4"
                >
                  <span className="font-medium">{location.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationSelector;
