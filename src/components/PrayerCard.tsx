
import { LucideIcon } from 'lucide-react';

interface PrayerCardProps {
  prayer: {
    name: string;
    arabicName: string;
    time: string;
    icon: LucideIcon;
  };
  isNext: boolean;
}

const PrayerCard = ({ prayer, isNext }: PrayerCardProps) => {
  const IconComponent = prayer.icon;

  return (
    <div className={`prayer-card transform hover:scale-[1.02] ${isNext ? 'next-prayer' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl ${isNext ? 'bg-indigo-100' : 'bg-slate-100'}`}>
            <IconComponent className={`w-6 h-6 ${isNext ? 'text-indigo-600' : 'text-slate-600'}`} />
          </div>
          
          <div>
            <h3 className={`prayer-name ${isNext ? 'text-indigo-700' : ''}`}>
              {prayer.name}
            </h3>
            <p className="text-sm text-slate-500 font-arabic">
              {prayer.arabicName}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className={`time-display ${isNext ? 'text-indigo-600' : ''}`}>
            {prayer.time}
          </p>
          {isNext && (
            <p className="text-xs text-indigo-600 font-medium">
              Prochaine prière
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrayerCard;
