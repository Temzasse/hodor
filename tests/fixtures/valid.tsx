type Props = {
  title: string;
};

export function Card({ title }: Props) {
  return <section>{title}</section>;
}

export function createInvoice({
  customerId,
  invoiceId,
  receiptMode,
}: {
  customerId: string;
  invoiceId: string;
  receiptMode: "send" | "skip";
}) {
  return { customerId, invoiceId, receiptMode };
}

export function parseInvoice(raw: string, schema: { parse(value: unknown): Props }) {
  return schema.parse(JSON.parse(raw));
}

export function SearchBox({ query }: { query: string }) {
  useEffectEvent(() => query);
  return <Card title={query.trim()} />;
}

declare function useEffectEvent(callback: () => string): () => string;
