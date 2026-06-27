import React from "react";

type Props = {
  label: string;
};

export const Input = React.forwardRef<HTMLInputElement, Props>(function Input({ label }, ref) {
  return <input ref={ref} aria-label={label} />;
});
