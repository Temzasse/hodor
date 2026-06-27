export function createInvoice(customerId: string, invoiceId: string, retryCount: number) {
  return { customerId, invoiceId, retryCount };
}
