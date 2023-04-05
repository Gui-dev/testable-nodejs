import { describe, it, mock } from 'node:test'
import assert from 'node:assert'

import { createOrder } from './create-order.js'
import { transport } from './mail/transport.js'

describe('#Create Order', () => {
  mock.method(transport, 'sendMail', () => {
    console.log('Enviou')
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
    console.log(order.id)
    assert.ok(order.id)
  })
})

