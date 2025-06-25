
interface PrayerTimesResponse {
  data: {
    timings: {
      Fajr: string;
      Dhuhr: string;
      Asr: string;
      Maghrib: string;
      Isha: string;
    };
    date: {
      readable: string;
      gregorian: {
        date: string;
      };
    };
  };
}

interface CityCoordinates {
  latitude: number;
  longitude: number;
  timezone: string;
}

const cityCoordinates: Record<string, CityCoordinates> = {
  'Paris, France': { latitude: 48.8566, longitude: 2.3522, timezone: 'Europe/Paris' },
  'Londres, Royaume-Uni': { latitude: 51.5074, longitude: -0.1278, timezone: 'Europe/London' },
  'Madrid, Espagne': { latitude: 40.4168, longitude: -3.7038, timezone: 'Europe/Madrid' },
  'Berlin, Allemagne': { latitude: 52.5200, longitude: 13.4050, timezone: 'Europe/Berlin' },
  'Rome, Italie': { latitude: 41.9028, longitude: 12.4964, timezone: 'Europe/Rome' },
  'Amsterdam, Pays-Bas': { latitude: 52.3676, longitude: 4.9041, timezone: 'Europe/Amsterdam' },
  'Bruxelles, Belgique': { latitude: 50.8503, longitude: 4.3517, timezone: 'Europe/Brussels' },
  'Zurich, Suisse': { latitude: 47.3769, longitude: 8.5417, timezone: 'Europe/Zurich' },
  'Vienne, Autriche': { latitude: 48.2082, longitude: 16.3738, timezone: 'Europe/Vienna' },
  'Stockholm, Suède': { latitude: 59.3293, longitude: 18.0686, timezone: 'Europe/Stockholm' },
};

export const fetchPrayerTimes = async (location: string) => {
  const coordinates = cityCoordinates[location];
  if (!coordinates) {
    throw new Error(`Coordonnées non trouvées pour ${location}`);
  }

  const today = new Date();
  const dateString = today.toISOString().split('T')[0]; // Format YYYY-MM-DD

  try {
    const response = await fetch(
      `https://api.aladhan.com/v1/timings/${dateString}?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&method=2&tune=0,0,0,0,0,0,0,0,0`
    );

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    const data: PrayerTimesResponse = await response.json();
    
    // Formatage des horaires (suppression des secondes et conversion au format 24h)
    const formatTime = (time: string) => {
      return time.split(' ')[0].substring(0, 5); // Garde seulement HH:MM
    };

    return {
      fajr: formatTime(data.data.timings.Fajr),
      dhuhr: formatTime(data.data.timings.Dhuhr),
      asr: formatTime(data.data.timings.Asr),
      maghrib: formatTime(data.data.timings.Maghrib),
      isha: formatTime(data.data.timings.Isha),
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des horaires de prière:', error);
    throw error;
  }
};
