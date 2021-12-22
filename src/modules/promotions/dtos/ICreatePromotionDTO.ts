export default interface ICreatePromotionDTO {
  employee_id: string
  store_id: string
  name: string
  description: string
  start_time: Date
  finish_time: Date
  product_price: number
  product_discount: number
  quantity: number
}
