export function TickerStrip({ ticker }: { ticker: string }) {
  return (
    <div className="overflow-hidden whitespace-nowrap border-y-[3px] border-[#16130C] bg-[#16130C] py-[11px] text-[#FFCE00]">
      <div className="scf-ticker inline-block font-anton text-[22px] tracking-[2px]">
        {ticker.repeat(8)}
      </div>
    </div>
  );
}
