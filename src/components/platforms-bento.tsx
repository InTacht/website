"use client";

import { motion } from "motion/react";
import { useState, type ReactNode } from "react";
import {
  BentoBotPanel,
  BentoBotrPanel,
  BentoMidrPanel,
  BentoTallPanel,
  BentoTopPanel,
} from "@/components/bento-panels";
import { MidBento } from "@/components/mid-bento";
import { MagneticItem, bentoEntrance } from "@/components/magnetic";
import { bentoPanels } from "@/lib/bento-content";
import { projects, type Project } from "@/lib/projects";

/**
 * Three fixed frames (never fluid to viewport):
 * - Mobile  (< md): 360×360
 * - Tablet  (md):   680×680
 * - Desktop (lg+):  900×900 square
 */
export function PlatformsBento({
  initialActiveId = null,
}: {
  initialActiveId?: Project["id"] | null;
}) {
  const [activeId, setActiveId] = useState<Project["id"] | null>(initialActiveId);
  const activeProject =
    projects.find((p) => p.id === activeId) ?? projects[0];
  const content = bentoPanels[activeProject.id];

  const panelMotion = (panel: ReactNode) => (
    <motion.div
      key={activeProject.id}
      className="h-full min-h-0"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {panel}
    </motion.div>
  );

  return (
    <div
      className={[
        "mx-auto grid shrink-0 grid-cols-3 grid-rows-3",
        "size-[360px] gap-2.5 rounded-[1.5rem]",
        "md:size-[680px] md:gap-3.5",
        "lg:size-[900px] lg:gap-4",
        "[grid-template-areas:'tall_top_top'_'tall_mid_midr'_'bot_bot_botr']",
      ].join(" ")}
    >
      <MagneticItem
        className="h-full min-h-0"
        style={{ gridArea: "tall" }}
        surfaceClassName="glass h-full w-full min-h-0 overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem]"
        strength={14}
        entrance={bentoEntrance.tall}
      >
        {panelMotion(<BentoTallPanel project={activeProject} content={content} />)}
      </MagneticItem>

      <MagneticItem
        className="h-full min-h-0"
        style={{ gridArea: "top" }}
        surfaceClassName="glass h-full w-full min-h-0 overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem]"
        strength={16}
        entrance={bentoEntrance.top}
      >
        {panelMotion(<BentoTopPanel project={activeProject} content={content} />)}
      </MagneticItem>

      <MidBento activeId={activeId} onActiveChange={setActiveId} />

      <MagneticItem
        className="h-full min-h-0"
        style={{ gridArea: "midr" }}
        surfaceClassName="glass h-full w-full min-h-0 overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem]"
        strength={18}
        entrance={bentoEntrance.midr}
      >
        {panelMotion(<BentoMidrPanel project={activeProject} content={content} />)}
      </MagneticItem>

      <MagneticItem
        className="h-full min-h-0"
        style={{ gridArea: "bot" }}
        surfaceClassName="glass h-full w-full min-h-0 overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem]"
        strength={16}
        entrance={bentoEntrance.bot}
      >
        {panelMotion(<BentoBotPanel project={activeProject} content={content} />)}
      </MagneticItem>

      <MagneticItem
        className="h-full min-h-0"
        style={{ gridArea: "botr" }}
        surfaceClassName="glass h-full w-full min-h-0 overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem]"
        strength={18}
        entrance={bentoEntrance.botr}
      >
        {panelMotion(<BentoBotrPanel project={activeProject} content={content} />)}
      </MagneticItem>
    </div>
  );
}
