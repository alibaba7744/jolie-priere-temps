
import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface NextPrayerCountdownProps {
  nextPrayer: {
    name: string;
    arabicName: string;
    time: string;
    icon: any;
  };
  currentTime: Date;
}

const NextPrayerCountdown = ({ nextPrayer, currentTime }: NextPrayerCountdownProps) => {
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const [hours, minutes] = nextPrayer.time.split(':').map(Number);
      const prayerTime = new Date();
      prayerTime.setHours(hours, minutes, 0, 0);

      // Si l'heure de prière est déjà passée aujourd'hui, c'est pour demain
      if (prayerTime <= currentTime) {
        prayerTime.setDate(prayerTime.getDate() + 1);
      }

      const diff = prayerTime.getTime() - currentTime.getTime();
      const hoursRemaining = Math.floor(diff / (1000 * 60 * 60));
      const minutesRemaining = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secondsRemaining = Math.floor((diff % (1000 * 60)) / 1000);

      if (hoursRemaining > 0) {
        setTimeRemaining(`${hoursRemaining}h ${minutesRemaining}m`);
      } else if (minutesRemaining > 0) {
        setTimeRemaining(`${minutesRemaining}m ${secondsRemaining}s`);
      } else {
        setTimeRemaining(`${secondsRemaining}s`);
      }
    };

    calculateTimeRemaining();
  }, [currentTime, nextPrayer.time]);

  return (
    <div className="prayer-gradient rounded-2xl p-6 text-white shadow-lg">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Clock className="w-5 h-5" />
          <p className="text-sm opacity-90">Prochaine prière</p>
        </div>
        
        <h2 className="text-2xl font-bold mb-1">{nextPrayer.name}</h2>
        <p className="text-lg opacity-90 mb-3">{nextPrayer.arabicName}</p>
        
        <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
          <p className="text-3xl font-bold font-mono">{nextPrayer.time}</p>
          <p className="text-sm opacity-90">dans {timeRemaining}</p>
        </div>
      </div>
    </div>
  );
};

export default NextPrayerCountdown;
