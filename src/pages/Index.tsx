
import { useState, useEffect } from 'react';
import { Clock, Sunrise, Sun, Sunset, Moon, Star } from 'lucide-react';
import PrayerCard from '../components/PrayerCard';
import LocationHeader from '../components/LocationHeader';
import NextPrayerCountdown from '../components/NextPrayerCountdown';
import { getPrayerTimesForLocation } from '../utils/prayerTimes';

interface PrayerTime {
  name: string;
  arabicName: string;
  time: string;
  icon: any;
}

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState(0);
  const [currentLocation, setCurrentLocation] = useState('Paris, France');

  // Récupérer les horaires de prière pour la ville sélectionnée
  const locationTimes = getPrayerTimesForLocation(currentLocation);
  
  const prayerTimes: PrayerTime[] = [
    {
      name: "Fajr",
      arabicName: "الفجر",
      time: locationTimes.fajr,
      icon: Sunrise
    },
    {
      name: "Dhuhr",
      arabicName: "الظهر", 
      time: locationTimes.dhuhr,
      icon: Sun
    },
    {
      name: "Asr",
      arabicName: "العصر",
      time: locationTimes.asr,
      icon: Sun
    },
    {
      name: "Maghrib",
      arabicName: "المغرب",
      time: locationTimes.maghrib,
      icon: Sunset
    },
    {
      name: "Isha",
      arabicName: "العشاء",
      time: locationTimes.isha,
      icon: Moon
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Déterminer la prochaine prière
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    
    for (let i = 0; i < prayerTimes.length; i++) {
      const [hours, minutes] = prayerTimes[i].time.split(':').map(Number);
      const prayerMinutes = hours * 60 + minutes;
      
      if (currentMinutes < prayerMinutes) {
        setNextPrayer(i);
        return;
      }
    }
    
    // Si toutes les prières sont passées, la prochaine est Fajr du lendemain
    setNextPrayer(0);
  }, [currentTime, prayerTimes]);

  const handleLocationChange = (newLocation: string) => {
    setCurrentLocation(newLocation);
    console.log('Changement de ville:', newLocation);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header avec dégradé */}
      <div className="primary-gradient text-white py-8 px-4 rounded-b-3xl shadow-xl">
        <div className="max-w-md mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-8 h-8 text-yellow-300" />
            <h1 className="text-3xl font-bold">Horaires de Prière</h1>
            <Star className="w-8 h-8 text-yellow-300" />
          </div>
          
          <LocationHeader 
            currentLocation={currentLocation}
            onLocationChange={handleLocationChange}
          />
          
          <div className="mt-4 space-y-1">
            <p className="text-lg opacity-90">{formatDate(currentTime)}</p>
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-5 h-5" />
              <p className="text-xl font-mono">{formatTime(currentTime)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        {/* Compte à rebours vers la prochaine prière */}
        <NextPrayerCountdown 
          nextPrayer={prayerTimes[nextPrayer]} 
          currentTime={currentTime}
        />

        {/* Liste des prières */}
        <div className="space-y-3">
          {prayerTimes.map((prayer, index) => (
            <PrayerCard
              key={prayer.name}
              prayer={prayer}
              isNext={index === nextPrayer}
            />
          ))}
        </div>

        {/* Footer spirituel */}
        <div className="text-center mt-8 p-4">
          <p className="text-slate-600 text-sm italic">
            "Et accomplis la prière aux deux extrémités du jour et à certaines heures de la nuit"
          </p>
          <p className="text-slate-500 text-xs mt-2">Coran 11:114</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
