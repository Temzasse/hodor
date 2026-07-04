// hodor-test expect-message: instead of 3 positional parameters
export function createInvoice(customerId: string, invoiceId: string, retryCount: number) {
  return { customerId, invoiceId, retryCount };
}
