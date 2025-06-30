"use client";

interface ButtonProps {
  onclick: () => void;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ onclick, text }) => {
  return (
    <button
      onClick={onclick}
      className="mt-4 px-10 py-3 cursor-pointer text-white font-bold rounded-xl shadow-lg border-2 border-[#FFC100] relative overflow-hidden bg-gradient-to-r from-[#FF8200] via-[#FFC100] to-[#FF8200] bg-[length:200%_100%] bg-left hover:bg-right transition-[background-position,color] duration-500 ease-in-out h-[52px] w-[259px]"
      data-oid="tculw3w"
    >
      {text}
    </button>
  );
};

export default Button;
