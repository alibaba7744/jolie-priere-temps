
interface PrayerTimesData {
  [key: string]: {
    fajr: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
  };
}

export const prayerTimesData: PrayerTimesData = {
  'Paris, France': {
    fajr: '06:15',
    dhuhr: '13:45',
    asr: '16:30',
    maghrib: '19:15',
    isha: '21:00'
  },
  'Londres, Royaume-Uni': {
    fajr: '05:45',
    dhuhr: '13:15',
    asr: '16:00',
    maghrib: '18:45',
    isha: '20:30'
  },
  'Madrid, Espagne': {
    fajr: '06:30',
    dhuhr: '14:00',
    asr: '16:45',
    maghrib: '19:30',
    isha: '21:15'
  },
  'Berlin, Allemagne': {
    fajr: '05:30',
    dhuhr: '13:00',
    asr: '15:45',
    maghrib: '18:30',
    isha: '20:15'
  },
  'Rome, Italie': {
    fajr: '06:00',
    dhuhr: '13:30',
    asr: '16:15',
    maghrib: '19:00',
    isha: '20:45'
  },
  'Amsterdam, Pays-Bas': {
    fajr: '05:45',
    dhuhr: '13:15',
    asr: '16:00',
    maghrib: '18:45',
    isha: '20:30'
  },
  'Bruxelles, Belgique': {
    fajr: '06:00',
    dhuhr: '13:30',
    asr: '16:15',
    maghrib: '19:00',
    isha: '20:45'
  },
  'Zurich, Suisse': {
    fajr: '06:15',
    dhuhr: '13:45',
    asr: '16:30',
    maghrib: '19:15',
    isha: '21:00'
  },
  'Vienne, Autriche': {
    fajr: '05:45',
    dhuhr: '13:15',
    asr: '16:00',
    maghrib: '18:45',
    isha: '20:30'
  },
  'Stockholm, Suède': {
    fajr: '04:30',
    dhuhr: '12:45',
    asr: '15:30',
    maghrib: '18:15',
    isha: '20:00'
  }
};

export const getPrayerTimesForLocation = (location: string) => {
  return prayerTimesData[location] || prayerTimesData['Paris, France'];
};
