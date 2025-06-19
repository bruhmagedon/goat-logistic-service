// file: src/widgets/analytics/PurchaseAnalytics.tsx

import { PurchaseBrandChart } from '@/features/user-profile/compose/purchase-brand-chart';
import { PurchaseCategoryChart } from '@/features/user-profile/compose/purchase-category-chart';
import { PurchaseDynamicsChart } from '@/features/user-profile/compose/purchase-dynamics-chart';
import { Separator } from '@/shared/ui/kit/separator';

export function PurchaseAnalytics() {
  return (
    <div className="space-y-6 border-l">
      <h2 className="m-0 p-6.75 font-semibold text-neutral-900 text-xl">Аналитика закупок</h2>
      <Separator />
      <PurchaseDynamicsChart />
      <div className="mx-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <PurchaseCategoryChart />
        <PurchaseBrandChart />
      </div>
    </div>
  );
}
