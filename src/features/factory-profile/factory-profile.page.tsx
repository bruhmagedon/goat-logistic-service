import { ProfileEditor } from './compose/profile-editor';
import { SalesAnalytics } from './compose/sales-analytics';

function FactoryProfile() {
  return (
    <div className="grid w-full grid-cols-1 lg:grid-cols-[420px_1fr]">
      {/* Левая колонка - Профиль */}
      <div className="border-r">
        <ProfileEditor />
      </div>

      {/* Правая колонка - Аналитика */}
      <div>
        <SalesAnalytics />
      </div>
    </div>
  );
}

export const Component = FactoryProfile;
