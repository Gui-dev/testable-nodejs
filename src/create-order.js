import { randomUUID } from 'node:crypto'

import { transport } from './mail/transport.js'

export async function createOrder (data, ordersRepository) {
  const { customerId, amount } = data

  const orderId = randomUUID()
  const isPriority = amount > 3000

  const order = await ordersRepository.create({
    customerId,
    isPriority,
    amount
  })

  const amountFormatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }
  ).format(amount)

  await transport.sendMail({
    from: {
      name: 'Bruce Wayne',
      address: 'bruce@email.com',
    },
    to: {
      name: 'Wayne Enterprises',
      address: 'wayne@email.com',
    },
    subject: `New order #${order.id}`,
    html: `<strong>New order:</strong> ${order.id} with amount of ${amountFormatted}`
  })

  return order
}
