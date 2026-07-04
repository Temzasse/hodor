// hodor-test expect-message: Avoid useCallback by default
import { useCallback } from "react";

export function Button({ onClick }: { onClick(): void }) {
  const wrappedClick = useCallback(() => onClick(), [onClick]);

  return <button onClick={wrappedClick}>Save</button>;
}
