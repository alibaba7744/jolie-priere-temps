
import { useState, useEffect } from 'react';
import { getPrayerTimesForLocation, getFallbackPrayerTimes } from '../utils/prayerTimes';

interface PrayerTimes {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export const usePrayerTimes = (location: string) => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes>(() => 
    getFallbackPrayerTimes(location)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPrayerTimes = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const times = await getPrayerTimesForLocation(location);
        setPrayerTimes(times);
      } catch (err) {
        setError('Impossible de charger les horaires de prière');
        // Les horaires de fallback sont déjà définis dans l'état initial
      } finally {
        setLoading(false);
      }
    };

    loadPrayerTimes();
  }, [location]);

  return { prayerTimes, loading, error };
};
