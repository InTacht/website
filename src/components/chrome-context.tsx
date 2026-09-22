"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ChromeContextValue = {
  topBarHidden: boolean;
  setTopBarHidden: (hidden: boolean) => void;
};

const ChromeContext = createContext<ChromeContextValue | null>(null);

export function ChromeProvider({ children }: { children: ReactNode }) {
  const [topBarHidden, setTopBarHiddenState] = useState(false);
  const setTopBarHidden = useCallback((hidden: boolean) => {
    setTopBarHiddenState(hidden);
  }, []);

  const value = useMemo(
    () => ({ topBarHidden, setTopBarHidden }),
    [topBarHidden, setTopBarHidden],
  );

  return (
    <ChromeContext.Provider value={value}>{children}</ChromeContext.Provider>
  );
}

export function useChrome() {
  const ctx = useContext(ChromeContext);
  if (!ctx) {
    throw new Error("useChrome must be used within ChromeProvider");
  }
  return ctx;
}

/** Safe for SiteTopBar when provider is present; defaults to visible. */
export function useTopBarHidden() {
  const ctx = useContext(ChromeContext);
  return ctx?.topBarHidden ?? false;
}
