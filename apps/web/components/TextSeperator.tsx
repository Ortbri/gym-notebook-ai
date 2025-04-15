import React from "react";

function TextSeperator({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex flex-row max-w-4xl  mx-auto items-center">
      <div className="h-px w-100 bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.08))] rounded-full" />
      <div className="text-md  border-1 px-3 py-1 rounded-full border-[rgba(255,255,255,0.18)]">
        {text}
      </div>
      <div className="h-px w-100 bg-[linear-gradient(to_right,rgba(255,255,255,0.08),transparent)] rounded-full" />
    </div>
  );
}

export default TextSeperator;
