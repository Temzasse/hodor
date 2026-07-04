// hodor-test expect-message: Avoid useMemo by default
import { useMemo } from "react";

export function SearchBox({ query }: { query: string }) {
  const trimmedQuery = useMemo(() => query.trim(), [query]);

  return <input value={trimmedQuery} readOnly />;
}
