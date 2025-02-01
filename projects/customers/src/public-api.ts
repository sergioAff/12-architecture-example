/*
 * Public API Surface of customers
 */
export * from './infrastructure/ui/routes/customers.routes';
export { GetAllCustomerUseCase } from './application/get-all-customers.usecase';
export type { ICustomer } from './domain/model/customer';
