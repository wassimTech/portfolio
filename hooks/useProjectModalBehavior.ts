"use client";

import { useEffect, useRef } from "react";

interface UseProjectModalBehaviorOptions {
  isOpen: boolean;
  hasProject: boolean;
  onClose: () => void;
}

export function useProjectModalBehavior({
  isOpen,
  hasProject,
  onClose,
}: UseProjectModalBehaviorOptions) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !hasProject) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    if (!dialog.open) {
      try {
        dialog.showModal();
      } catch {
        // Dialog may already be open or in an invalid state — ignore
      }
    }
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    const handleBackdropClick = (e: MouseEvent) => {
      if (e.target === dialog) {
        onClose();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      const scrollEl = scrollRef.current;
      if (!scrollEl) return;

      // If wheel event originated on header or dialog backdrop (outside scrollEl), scroll the modal content
      if (!scrollEl.contains(e.target as Node)) {
        e.preventDefault();
        scrollEl.scrollTop += e.deltaY;
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const scrollEl = scrollRef.current;
      if (!scrollEl || e.touches.length === 0) return;

      // Enable touch drag scrolling even when gesture starts on the header
      if (!scrollEl.contains(e.target as Node)) {
        const currentY = e.touches[0].clientY;
        const deltaY = touchStartY - currentY;
        scrollEl.scrollTop += deltaY;
        touchStartY = currentY;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      const scrollEl = scrollRef.current;
      if (!scrollEl) return;

      // Do not intercept arrow keys if focus is within an editable or selectable element
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.tagName === "SELECT" ||
          (activeEl as HTMLElement).isContentEditable)
      ) {
        return;
      }

      // Use instant 'auto' scrolling to avoid smooth-scroll animation queue bottleneck
      if (typeof scrollEl.scrollBy === "function") {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          scrollEl.scrollBy({ top: 60, behavior: "auto" });
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          scrollEl.scrollBy({ top: -60, behavior: "auto" });
        } else if (e.key === "PageDown") {
          e.preventDefault();
          scrollEl.scrollBy({
            top: scrollEl.clientHeight * 0.8,
            behavior: "auto",
          });
        } else if (e.key === "PageUp") {
          e.preventDefault();
          scrollEl.scrollBy({
            top: -scrollEl.clientHeight * 0.8,
            behavior: "auto",
          });
        }
      } else {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          scrollEl.scrollTop += 60;
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          scrollEl.scrollTop -= 60;
        } else if (e.key === "PageDown") {
          e.preventDefault();
          scrollEl.scrollTop += scrollEl.clientHeight * 0.8;
        } else if (e.key === "PageUp") {
          e.preventDefault();
          scrollEl.scrollTop -= scrollEl.clientHeight * 0.8;
        }
      }

      if (e.key === "Home") {
        e.preventDefault();
        if (typeof scrollEl.scrollTo === "function") {
          scrollEl.scrollTo({ top: 0, behavior: "auto" });
        } else {
          scrollEl.scrollTop = 0;
        }
      } else if (e.key === "End") {
        e.preventDefault();
        if (typeof scrollEl.scrollTo === "function") {
          scrollEl.scrollTo({ top: scrollEl.scrollHeight, behavior: "auto" });
        } else {
          scrollEl.scrollTop = scrollEl.scrollHeight;
        }
      }
    };

    dialog.addEventListener("click", handleBackdropClick);
    dialog.addEventListener("wheel", handleWheel, { passive: false });
    dialog.addEventListener("touchstart", handleTouchStart, { passive: true });
    dialog.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      dialog.removeEventListener("click", handleBackdropClick);
      dialog.removeEventListener("wheel", handleWheel);
      dialog.removeEventListener("touchstart", handleTouchStart);
      dialog.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen, hasProject, onClose]);

  return {
    dialogRef,
    closeButtonRef,
    scrollRef,
  };
}
