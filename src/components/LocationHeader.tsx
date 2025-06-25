
import LocationSelector from './LocationSelector';

interface LocationHeaderProps {
  currentLocation: string;
  onLocationChange: (location: string) => void;
}

const LocationHeader = ({ currentLocation, onLocationChange }: LocationHeaderProps) => {
  return (
    <LocationSelector 
      currentLocation={currentLocation}
      onLocationChange={onLocationChange}
    />
  );
};

export default LocationHeader;
