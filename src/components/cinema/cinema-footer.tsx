export function CinemaFooter() {
  return (
    <footer
      className="border-t-[3px] border-[#16130C] bg-[#16130C] px-5 py-11 text-[#FFCE00] sm:px-9"
      id="about"
    >
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-6">
        <div className="font-anton text-3xl tracking-[1px]">CINÉ·FOLIO</div>
        <div className="text-left font-oswald text-[13px] font-medium tracking-[1px] text-[#FFCE00]/70 sm:text-right">
          © 2026 · ALL SCREENINGS RESERVED
        </div>
      </div>
    </footer>
  );
}
