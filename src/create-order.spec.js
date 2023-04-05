import { describe, it, mock } from 'node:test'
import assert from 'node:assert'

import { InMemoryOrdersRepository } from './__test__/in-memory-orders-repository.js'
import { createOrder } from './create-order.js'
import { transport } from './mail/transport.js'

describe('#Create Order', () => {
  mock.method(transport, 'sendMail', () => {
    console.log('Enviou e-mail')
  })

  it('should be able to create a new order', async () => {
    const inMemoryOrdersRepository = new InMemoryOrdersRepository()
    const order = await createOrder({
      customerId: 'customer-fake-id',
      amount: 1000
    }, inMemoryOrdersRepository)

    assert.ok(order.id)
    assert.equal(inMemoryOrdersRepository.orders[0].amount, 1000)
  })

  it('should be able orders with an amount higher than 3000 should be marked as priority', async () => {
    const inMemoryOrdersRepository = new InMemoryOrdersRepository()
    const order = await createOrder({
      customerId: 'customer-fake-id',
      amount: 4000
    }, inMemoryOrdersRepository)

    assert.equal(order.priority, true)
  })

  it('should be able orders with an amount lower than 3000 should not be marked as priority', async () => {
    const inMemoryOrdersRepository = new InMemoryOrdersRepository()
    const order = await createOrder({
      customerId: 'customer-fake-id',
      amount: 2000
    }, inMemoryOrdersRepository)

    assert.equal(order.priority, false)
  })
})

