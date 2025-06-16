import React from "react";
import { Button } from "@/shared/ui/kit/button";
import { ListIcon, LayoutGridIcon } from "lucide-react"; // Пример иконок
import { ViewMode } from "./types";

interface ViewModeToggleProps {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}

export function ViewModeToggle({ value, onChange }: ViewModeToggleProps) {
  return (
    <div className="flex items-center gap-1">
      <Button
        variant={value === "cards" ? "secondary" : "ghost"}
        size="icon"
        onClick={() => onChange("cards")}
        aria-label="Вид карточками"
      >
        <LayoutGridIcon className="h-5 w-5" />
      </Button>
      <Button
        variant={value === "list" ? "secondary" : "ghost"}
        size="icon"
        onClick={() => onChange("list")}
        aria-label="Вид списком"
      >
        <ListIcon className="h-5 w-5" />
      </Button>
    </div>
  );
}
