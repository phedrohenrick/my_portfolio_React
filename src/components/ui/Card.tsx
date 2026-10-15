import type { HTMLAttributes } from "react";

const Card = ({ className = "", ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`rounded-[20px] border border-line bg-white shadow-[0_1px_2px_rgba(1,44,50,0.04)] ${className}`}
    {...rest}
  />
);

export default Card;
