"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";


export default function RouteProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const startedRef = useRef(false);
  const trickleTimer = useRef<number | null>(null);
  const safetyTimer = useRef<number | null>(null);
  const prevRoute = useRef(`${pathname}${searchParams.toString()}`);

  const clearTimers = () => {
    if (trickleTimer.current) window.clearInterval(trickleTimer.current);
    if (safetyTimer.current) window.clearTimeout(safetyTimer.current);
    trickleTimer.current = null;
    safetyTimer.current = null;
  };

  const start = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    clearTimers();
    setVisible(true);
    setProgress(12);

  
    trickleTimer.current = window.setInterval(() => {
      setProgress((p) => (p < 88 ? p + Math.random() * 12 : p));
    }, 300);

    // Safety net: if the route never changes (e.g. same-page anchor),
    // finish after a few seconds so the bar never gets stuck.
    safetyTimer.current = window.setTimeout(finish, 8000);
  };

  const finish = () => {
    if (!startedRef.current) return;
    startedRef.current = false;
    clearTimers();
    setProgress(100);
    window.setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 250);
  };

  // Start the bar on internal <a> clicks (next/link renders <a>).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (/^https?:\/\//i.test(href) && !anchor.href.startsWith(window.location.origin)) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      start();
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      clearTimers();
    };
  }, []);

  // Complete the bar once the route actually changes.
  const route = `${pathname}${searchParams.toString()}`;
  useEffect(() => {
    if (prevRoute.current === route) return;
    prevRoute.current = route;
    finish();
  }, [route]);

  if (!visible) return null;

  return (
    <div
      role="progressbar"
      aria-label="Loading"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-1"
    >
      <div
        className="h-full rounded-r-full bg-linear-to-r from-blue-600 via-cyan-500 to-blue-400 shadow-[0_0_10px_rgba(37,99,235,0.6)] transition-[width] duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
