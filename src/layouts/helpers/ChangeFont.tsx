import type { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fontList, changeFont } from './changeFont';

const ChangeFont = ({ children }: { children: ReactNode }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          id="toggle-theme-button"
          type="button"
          className="rounded-lg text-sm p-2.5 inline-flex items-center hover:bg-gray-200 focus-visible:outline-0 dark:hover:bg-gray-800"
          aria-label="Change font"
        >
          {children}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <ScrollArea className="h-44">
          {fontList.map((font) => (
            <DropdownMenuItem
              key={font.key}
              onClick={() => {
                changeFont(font.key);
              }}
            >
              {font.name}
            </DropdownMenuItem>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChangeFont;
