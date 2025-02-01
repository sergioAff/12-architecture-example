/*
 * Public API Surface of dishes
 */

export * from './infrastructure/ui/routes/dishes.routes';
export type { IDish } from './domain/model/dish';
export { GetAllDishesUseCase } from './application/get-all-dishes.usecase';
