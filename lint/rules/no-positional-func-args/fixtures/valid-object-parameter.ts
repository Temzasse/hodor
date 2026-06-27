export function createInvoice({
  customerId,
  receiptMode,
}: {
  customerId: string;
  receiptMode: "send" | "skip";
}) {
  return { customerId, receiptMode };
}
