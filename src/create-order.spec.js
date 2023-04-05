import { describe, it, mock } from 'node:test'
import assert from 'node:assert'

import { createOrder } from './create-order.js'
import { transport } from './mail/transport.js'

describe('#Create Order', () => {
  mock.method(transport, 'sendMail', () => {
    console.log('Enviou e-mail')
  })

  it('should be able to create a new order', async () => {
    const order = await createOrder({
      customerId: 'customer-fake-id',
      amount: 1000
    }, {
      create (data) {
        const id = 'order-fake-id'
        return {
          id,
          ...data
        }
      }
    })
    assert.ok(order.id)
  })

  it('should be able orders with an amount higher than 3000 should be marked as priority', async () => {
    const order = await createOrder({
      customerId: 'customer-fake-id',
      amount: 4000
    }, {
      create (data) {
        const id = 'order-fake-id'
        return {
          id,
          customerId: data.customerId,
          priority: data.isPriority,
          amount: data.amount
        }
      }
    })

    assert.equal(order.priority, true)
  })

  it('should be able orders with an amount lower than 3000 should not be marked as priority', async () => {
    const order = await createOrder({
      customerId: 'customer-fake-id',
      amount: 2000
    }, {
      create (data) {
        const id = 'order-fake-id'
        return {
          id,
          customerId: data.customerId,
          priority: data.isPriority,
          amount: data.amount
        }
      }
    })

    assert.equal(order.priority, false)
  })
})

