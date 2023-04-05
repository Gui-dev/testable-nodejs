import { randomUUID } from 'node:crypto'

import { client } from './../database/client.js'

export class InMemoryOrdersRepository {
  orders = []

  async create (data) {
    const { customerId, isPriority, amount } = data

    const order = {
      id: randomUUID(),
      customerId,
      priority: isPriority,
      amount,
    }

    this.orders.push(order)

    return order
  }
}
