export default function LabsLoading() {
  return (
    <main className="flex min-h-[calc(100svh-3.5rem)] items-center justify-center bg-black pt-14">
      <div
        aria-hidden
        className="size-6 animate-spin rounded-full border border-white/15 border-t-white/70"
      />
    </main>
  );
}
