import { forwardRef, memo, useCallback, useEffect, useMemo } from "react";
import type { FC } from "react";

type Props = {
  title: string;
};

export const Card: FC<Props> = ({ title }) => <section>{title}</section>;

export function createInvoice(customerId: string, invoiceId: string, sendReceipt: boolean) {
  return { customerId, invoiceId, sendReceipt };
}

export function parseInvoice(raw: string) {
  return JSON.parse(raw) as Props;
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input(props, ref) {
  return <input ref={ref} aria-label={props.title} />;
});

export function SearchBox({ query }: { query: string }) {
  function fetchResults() {
    return query;
  }

  const stableQuery = useMemo(() => query.trim(), [query]);
  const onSubmit = useCallback(() => fetchResults(), []);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  return memo(Card)({ title: stableQuery + onSubmit.name });
}
