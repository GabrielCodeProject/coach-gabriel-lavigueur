"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { NavItem } from "./nav-items";

type MobileNavToggleProps = {
  items: readonly NavItem[];
  contactHref: string;
};

export function MobileNavToggle({ items, contactHref }: MobileNavToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setIsOpen(true)}
        aria-label="Ouvrir le menu"
        aria-expanded={isOpen}
      >
        <Menu className="size-5" />
      </Button>

      {isOpen
        ? createPortal(
            <div
              className="fixed inset-0 z-50 flex flex-col bg-background md:hidden"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex h-16 items-center justify-between border-b border-border px-4">
                <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Menu
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  aria-label="Fermer le menu"
                >
                  <X className="size-5" />
                </Button>
              </div>
              <nav className="flex flex-1 flex-col gap-1 p-4">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleClose}
                    className="rounded-md px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="mt-auto pt-6">
                  <Link
                    href={contactHref}
                    onClick={handleClose}
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "h-12 w-full px-6 text-base",
                    )}
                  >
                    Remplir mon questionnaire
                  </Link>
                </div>
              </nav>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
