type Props = {
  inputRef: React.Ref<HTMLInputElement>;
  label: string;
};

export function Input({ inputRef, label }: Props) {
  return <input ref={inputRef} aria-label={label} />;
}
