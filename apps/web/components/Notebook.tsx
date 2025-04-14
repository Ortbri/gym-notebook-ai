export default function Notebook() {
  return (
    <div className="mt-10 relative bg-background rounded-3xl">
      {/* Main paper with lines */}
      <div 
        className="w-[850px] h-[1100px] rounded-3xl relative shadow-2xl"
        style={{
          backgroundImage: 'linear-gradient(#1a1a1a 0.05em, transparent 0.05em)',
          backgroundSize: '100% 2em',
        }}
      >
        {/* Margin line */}
        <div 
          className="absolute top-0 left-[4em] h-full w-[2px] bg-[#1a1a1a] z-10"
        ></div>
        {/* Top blank header area */}
        <div
          className="absolute top-0 left-0 h-[6em] w-full bg-background rounded-3xl z-[1]"
        ></div>
        
        {/* Punch holes with background-matching circles to hide lines */}
        <div className="absolute top-[6em] left-[1em] w-[35px] h-[35px] z-20">
          {/* Background-colored fill to hide the lines */}
          <div className="absolute inset-0 rounded-full bg-background"></div>
          {/* Border and shadow for depth */}
          <div className="absolute inset-0 rounded-full border-[#1a1a1a] border-[1px] shadow-[inset_0_0_6px_rgba(0,0,0,0.2)]"></div>
        </div>
        
        {/* Middle hole */}
        <div className="absolute top-[50%] left-[1em] w-[35px] h-[35px] z-20">
          {/* Background-colored fill to hide the lines */}
          <div className="absolute inset-0 rounded-full bg-background"></div>
          {/* Border and shadow for depth */}
          <div className="absolute inset-0 rounded-full border-[#1a1a1a] border-[1px] shadow-[inset_0_0_6px_rgba(0,0,0,0.2)]"></div>
        </div>
        
        {/* Bottom hole */}
        <div className="absolute bottom-[6em] left-[1em] w-[35px] h-[35px] z-20">
          {/* Background-colored fill to hide the lines */}
          <div className="absolute inset-0 rounded-full bg-background"></div>
          {/* Border and shadow for depth */}
          <div className="absolute inset-0 rounded-full border-[#1a1a1a] border-[1px] shadow-[inset_0_0_6px_rgba(0,0,0,0.2)]"></div>
        </div>
      </div>
    </div>
  );
} 