import { ReactNode } from "react";

interface IModal {
  children: ReactNode;
}

export default function Modal({ children }: IModal) {
  return (
    <div className="fixed bottom-0 top-0 z-10 h-full w-full bg-white/50">
      <div className="fixed left-1/2 top-1/2 z-10  max-h-full min-w-[80%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center overflow-x-auto overflow-y-auto bg-black p-4 text-white opacity-100 sm:min-w-[60%]">
        {children}
      </div>
    </div>
  );
}
