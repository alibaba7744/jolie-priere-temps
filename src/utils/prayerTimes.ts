
import { fetchPrayerTimes } from '../services/prayerTimesApi';

interface PrayerTimesData {
  [key: string]: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
}

// Horaires de fallback en cas d'erreur API
export const fallbackPrayerTimesData: PrayerTimesData = {
  'Paris, France': {
    fajr: '07:15',
    dhuhr: '14:45',
    asr: '17:30',
    maghrib: '20:15',
    isha: '22:00'
  },
  'Londres, Royaume-Uni': {
    fajr: '06:45',
    dhuhr: '14:15',
    asr: '17:00',
    maghrib: '19:45',
    isha: '21:30'
  },
  'Madrid, Espagne': {
    fajr: '07:30',
    dhuhr: '15:00',
    asr: '17:45',
    maghrib: '20:30',
    isha: '22:15'
  },
  'Berlin, Allemagne': {
    fajr: '06:30',
    dhuhr: '14:00',
    asr: '16:45',
    maghrib: '19:30',
    isha: '21:15'
  },
  'Rome, Italie': {
    fajr: '07:00',
    dhuhr: '14:30',
    asr: '17:15',
    maghrib: '20:00',
    isha: '21:45'
  },
  'Amsterdam, Pays-Bas': {
    fajr: '06:45',
    dhuhr: '14:15',
    asr: '17:00',
    maghrib: '19:45',
    isha: '21:30'
  },
  'Bruxelles, Belgique': {
    fajr: '07:00',
    dhuhr: '14:30',
    asr: '17:15',
    maghrib: '20:00',
    isha: '21:45'
  },
  'Zurich, Suisse': {
    fajr: '07:15',
    dhuhr: '14:45',
    asr: '17:30',
    maghrib: '20:15',
    isha: '22:00'
  },
  'Vienne, Autriche': {
    fajr: '06:45',
    dhuhr: '14:15',
    asr: '17:00',
    maghrib: '19:45',
    isha: '21:30'
  },
  'Stockholm, Suède': {
    fajr: '05:30',
    dhuhr: '13:45',
    asr: '16:30',
    maghrib: '19:15',
    isha: '21:00'
  }
};

export const getPrayerTimesForLocation = async (location: string) => {
  try {
    console.log(`Récupération des horaires de prière pour ${location}...`);
    const realPrayerTimes = await fetchPrayerTimes(location);
    console.log('Horaires récupérés avec succès:', realPrayerTimes);
    return realPrayerTimes;
  } catch (error) {
    console.warn('Impossible de récupérer les horaires en ligne, utilisation des horaires de fallback:', error);
    return fallbackPrayerTimesData[location] || fallbackPrayerTimesData['Paris, France'];
  }
};

// Fonction synchrone pour les horaires de fallback
export const getFallbackPrayerTimes = (location: string) => {
  return fallbackPrayerTimesData[location] || fallbackPrayerTimesData['Paris, France'];
};
