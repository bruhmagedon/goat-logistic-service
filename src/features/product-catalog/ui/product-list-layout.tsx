import React from "react";
import { Skeleton } from "@/shared/ui/kit/skeleton"; // Предполагается наличие Skeleton
import { ViewMode } from "../model/types";

// Заголовок для секции контента (Товары, сортировка, переключатель вида)
export function ProductListLayoutHeader({
  title,
  actions,
}: {
  title: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">{title}</h1>
      {actions && <div className="flex items-center gap-4">{actions}</div>}
    </div>
  );
}

// Контейнер для отображения товаров (карточки или список)
export function ProductListLayoutContent({
  children,
  cursorRef,
  hasCursor,
  isEmpty,
  isPending,
  isPendingNext,
  mode,
  renderList,
  renderGrid,
}: {
  children?: React.ReactNode; // Для случаев, когда группы не используются
  isEmpty?: boolean;
  isPending?: boolean;
  isPendingNext?: boolean;
  cursorRef?: React.Ref<HTMLDivElement>;
  hasCursor?: boolean;
  mode: ViewMode;
  renderList?: () => React.ReactNode; // Функция для рендера списка
  renderGrid?: () => React.ReactNode; // Функция для рендера сетки
}) {
  if (isPending) {
    return <div className="text-center py-10 text-lg">Загрузка товаров...</div>;
  }

  if (isEmpty) {
    return <div className="text-center py-10 text-lg">Товары не найдены.</div>;
  }

  return (
    <div>
      {mode === "list" && renderList && (
        <div className="flex flex-col gap-0">{renderList()}</div> // gap-0 для ProductItem с border-b
      )}
      {mode === "cards" && renderGrid && (
        <div className="grid grid-cols-1  md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {renderGrid()}
        </div>
      )}
      {!isPending && children}

      {hasCursor && (
        <div ref={cursorRef} className="text-center py-8">
          {isPendingNext &&
            (mode === "cards" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-80 w-full" />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

// Основной компонент макета страницы
export function ProductListLayout({
  sidebar,
  header,
  children,
}: {
  sidebar: React.ReactNode;
  header: React.ReactNode; // ProductListLayoutHeader
  children: React.ReactNode; // ProductListLayoutContent
}) {
  return (
    <div className="flex flex-row xl:w-full">
      {sidebar}
      <div className="flex-1 p-6">
        {header}
        {children}
      </div>
    </div>
  );
}
