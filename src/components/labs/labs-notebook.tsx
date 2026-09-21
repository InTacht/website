"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { ExtendedRecordMap } from "notion-types";
import { site } from "@/lib/site";

import "react-notion-x/styles.css";

const NotionRenderer = dynamic(
  () => import("react-notion-x").then((mod) => mod.NotionRenderer),
  { ssr: false },
);

function LabsSpinner() {
  return (
    <div className="flex min-h-[calc(100svh-3.5rem)] items-center justify-center bg-black">
      <div
        aria-hidden
        className="size-6 animate-spin rounded-full border border-white/15 border-t-white/70"
      />
    </div>
  );
}

export function LabsNotebook() {
  const [recordMap, setRecordMap] = useState<ExtendedRecordMap | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/labs")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load notebook");
        return res.json() as Promise<ExtendedRecordMap>;
      })
      .then((data) => {
        if (!cancelled) setRecordMap(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div className="flex min-h-[calc(100svh-3.5rem)] flex-col items-center justify-center gap-4 bg-black px-6 text-center">
        <p className="text-sm font-light text-white/55">
          Couldn’t load the notebook.
        </p>
        <a
          href={site.labsNotebookHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-light uppercase tracking-[0.22em] text-white/70 transition hover:text-white"
        >
          Open in Notion
        </a>
      </div>
    );
  }

  if (!recordMap) return <LabsSpinner />;

  return (
    <div className="labs-notion dark-mode min-h-[calc(100svh-3.5rem)] bg-black text-white">
      <NotionRenderer
        recordMap={recordMap}
        fullPage
        darkMode
        disableHeader
        className="labs-notion-renderer"
        mapPageUrl={(pageId) =>
          `${site.labsNotebookHref.replace(/\/$/, "")}/${pageId.replace(/-/g, "")}`
        }
        components={{
          nextLink: Link,
        }}
      />
    </div>
  );
}
