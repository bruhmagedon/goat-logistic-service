// file: src/pages/user-profile/UserProfilePage.tsx

import { ProfileEditor } from "@/features/factory-profile/compose/profile-editor";
import { PurchaseAnalytics } from "@/features/user-profile/compose/purchase-analytics";
import { ScrollArea } from "@/shared/ui/kit/scroll-area";

function UserProfilePage() {
  return (
    // Главный контейнер, который занимает всю высоту экрана
    <div className="h-screen flex flex-col">
      {/* Здесь может быть ваш глобальный Header */}

      {/* Основной контент, который растягивается на всю оставшуюся высоту */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[420px_1fr] overflow-hidden">
        {/* Левая колонка - Профиль с собственным скроллом */}
        <ScrollArea className="h-full">
          <ProfileEditor />
        </ScrollArea>

        {/* Правая колонка - Аналитика с собственным скроллом */}
        <ScrollArea className="h-full bg-white">
          <PurchaseAnalytics />
        </ScrollArea>
      </div>
    </div>
  );
}

export const Component = UserProfilePage;
