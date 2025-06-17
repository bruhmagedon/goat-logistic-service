// file: src/widgets/analytics/PurchaseAnalytics.tsx

import { PurchaseBrandChart } from "@/features/user-profile/compose/purchase-brand-chart";
import { PurchaseCategoryChart } from "@/features/user-profile/compose/purchase-category-chart";
import { PurchaseDynamicsChart } from "@/features/user-profile/compose/purchase-dynamics-chart";

export function PurchaseAnalytics() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold text-neutral-900">
        Аналитика закупок
      </h2>
      <PurchaseDynamicsChart />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <PurchaseCategoryChart />
        <PurchaseBrandChart />
      </div>
    </div>
  );
}
