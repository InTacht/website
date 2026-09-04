"use client";

import Image from "next/image";
import { MagneticItem, squareEntrance } from "@/components/magnetic";
import { projects, type Project } from "@/lib/projects";

type HeroCardsProps = {
  onCardClick?: (id: Project["id"]) => void;
  onMarkClick?: (origin: { x: number; y: number }) => void;
  markSpinning?: boolean;
};

export function HeroCards({ onCardClick, onMarkClick, markSpinning }: HeroCardsProps) {
  const [leftCard, topRight, bottomRight] = projects;

  return (
    <div className="pointer-events-none absolute inset-y-0 left-[54%] right-[6%] z-10 hidden -translate-y-20 items-center justify-center md:flex lg:left-[56%] lg:right-[8%] lg:-translate-y-24">
      <div className="pointer-events-auto flex w-full max-w-[460px] flex-col items-center gap-4">
        {/* SQUARE — two columns */}
        <div className="grid w-full grid-cols-2 gap-3.5">
          {/* Column 1 */}
          <div className="flex flex-col items-stretch justify-center gap-3">
            {/* Row 1 — pill + circle */}
            <div className="flex h-12 items-center gap-3">
              <MagneticItem
                className="h-full min-w-0 flex-1"
                surfaceClassName="glass flex h-12 w-full items-center justify-center rounded-full px-4"
                strength={14}
                entrance={squareEntrance.pill}
              >
                <div className="relative h-[15px] w-[78px]">
                  <Image
                    src="/logo-dark.svg"
                    alt="InTacht"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </MagneticItem>

              <MagneticItem
                className="shrink-0"
                surfaceClassName="relative flex size-12 items-center justify-center rounded-full"
                strength={22}
                entrance={squareEntrance.circle}
              >
                <button
                  type="button"
                  aria-label="Release butterflies"
                  onClick={(event) => {
                    const rect = event.currentTarget.getBoundingClientRect();
                    onMarkClick?.({
                      x: rect.left + rect.width / 2,
                      y: rect.top + rect.height / 2,
                    });
                  }}
                  className={`relative flex size-full items-center justify-center rounded-full bg-white ${markSpinning ? "mark-spin" : ""}`}
                >
                  <div className="relative size-[22px]">
                    <Image
                      src="/mark.svg"
                      alt=""
                      fill
                      className="object-contain"
                      aria-hidden
                    />
                  </div>
                </button>
              </MagneticItem>
            </div>

            {/* Row 2 — left card */}
            <MagneticItem
              className="aspect-square"
              strength={16}
              entrance={squareEntrance.leftCard}
              surfaceClassName="glass h-full w-full rounded-[1.5rem]"
            >
              <button
                type="button"
                onClick={() => onCardClick?.(leftCard.id)}
                className="block h-full w-full p-4 text-left sm:p-5"
              >
                <CardBody project={leftCard} />
              </button>
            </MagneticItem>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-3">
            <MagneticItem
              className="aspect-square"
              strength={18}
              entrance={squareEntrance.topRight}
              surfaceClassName="glass h-full w-full rounded-[1.5rem]"
            >
              <button
                type="button"
                onClick={() => onCardClick?.(topRight.id)}
                className="block h-full w-full p-4 text-left sm:p-5"
              >
                <CardBody project={topRight} />
              </button>
            </MagneticItem>

            <MagneticItem
              className="aspect-square"
              strength={18}
              entrance={squareEntrance.bottomRight}
              surfaceClassName="glass h-full w-full rounded-[1.5rem]"
            >
              <button
                type="button"
                onClick={() => onCardClick?.(bottomRight.id)}
                className="block h-full w-full p-4 text-left sm:p-5"
              >
                <CardBody project={bottomRight} />
              </button>
            </MagneticItem>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardBody({
  project,
}: {
  project: (typeof projects)[number];
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <p className="text-lg font-medium tracking-tight text-white sm:text-xl">
        {project.name}
      </p>
      <p className="mt-3 line-clamp-6 text-[15px] font-light leading-relaxed text-white/55 sm:text-base">
        {project.description}
      </p>
    </div>
  );
}
