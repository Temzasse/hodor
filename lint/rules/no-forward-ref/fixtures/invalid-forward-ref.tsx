// hodor-test expect-message: Avoid forwardRef
import { forwardRef } from "react";

type Props = {
  label: string;
};

export const Input = forwardRef<HTMLInputElement, Props>(function Input({ label }, ref) {
  return <input ref={ref} aria-label={label} />;
});
