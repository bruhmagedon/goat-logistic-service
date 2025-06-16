import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  // Состояние для хранения отложенного значения
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Устанавливаем таймер, который обновит отложенное значение
    // после указанной задержки
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Очищаем таймер при каждом изменении значения или задержки,
    // а также при размонтировании компонента.
    // Это необходимо, чтобы избежать обновления отложенного значения,
    // если значение изменилось в течение периода задержки.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Перезапускаем эффект только если значение или задержка изменились

  return debouncedValue;
}
