import { StorySection } from "@/components/story-primitives";
import { site } from "@/lib/site";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="#ffffff"
      aria-hidden
      className={className}
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.28-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.29 0 .32.22.7.82.58A12.01 12.01 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="#ffffff"
      aria-hidden
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socialIcon: Record<(typeof site.socials)[number]["id"], typeof GitHubIcon> =
  {
    github: GitHubIcon,
    x: XIcon,
  };

export function ContactSection() {
  return (
    <StorySection
      id="contact"
      labelledBy="contact-headline"
      className="border-t border-white/10 pb-20 pt-16 md:pb-24 md:pt-20"
    >
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-16">
        <div className="max-w-md">
          <p className="text-[11px] font-light uppercase tracking-[0.28em] text-white/40">
            {site.name}
          </p>
          <h2
            id="contact-headline"
            className="mt-4 font-display text-3xl font-normal tracking-[-0.02em] text-white md:text-4xl"
          >
            Talk to the lab.
          </h2>
          <p className="mt-3 text-base font-light leading-relaxed text-white/50 md:text-lg">
            Reach us directly. Follow the work as it ships.
          </p>
        </div>

        <div className="flex flex-col gap-6 sm:items-end">
          <div className="sm:text-right">
            <p className="text-[11px] font-light uppercase tracking-[0.22em] text-white/35">
              Email
            </p>
            <a
              href={site.contactHref}
              className="mt-2 inline-block text-lg font-light tracking-wide text-white transition hover:text-white/75 md:text-xl"
            >
              {site.email}
            </a>
          </div>

          <nav aria-label="Social" className="flex items-center gap-3">
            {site.socials.map((social) => {
              const Icon = socialIcon[social.id];
              return (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex size-11 items-center justify-center rounded-full bg-white/[0.12] text-white shadow-[0_2px_12px_rgba(0,0,0,0.55)] ring-1 ring-white/30 transition hover:bg-white/[0.2] hover:ring-white/50"
                >
                  <Icon className="size-5" />
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </StorySection>
  );
}
