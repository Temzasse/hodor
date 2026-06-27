export function SearchBox({ query }: { query: string }) {
  const trimmedQuery = query.trim();

  return <input value={trimmedQuery} readOnly />;
}
