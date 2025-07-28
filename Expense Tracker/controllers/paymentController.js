const { Cashfree } = require('cashfree-pg');
const { Order, User } = require('../db');
const path = require('path');

const cashfree = new Cashfree(
  Cashfree.SANDBOX,
  process.env.CASHFREE_CLIENT_ID,
  process.env.CASHFREE_CLIENT_SECRET
);

exports.createOrder = async (req, res) => {
  const userId = req.user.userId;
  const orderId = `ORD_${Date.now()}`;
  const orderAmount = 199;

  try {
    const expiry = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();

    const request = {
      order_id: orderId,
      order_amount: orderAmount,
      order_currency: 'INR',
      customer_details: {
        customer_id: `user_${userId}`,
        customer_phone: '9876543210',
        customer_email: 'test@example.com',
      },
      order_meta: {
        return_url: `http://localhost:3000/api/payment-status/${orderId}`
      },
      order_expiry_time: expiry
    };

    const response = await cashfree.PGCreateOrder(request);

    await Order.create({
      orderId,
      userId,
      amount: orderAmount,
      status: 'PENDING'
    });

    res.json({ paymentSessionId: response.data.payment_session_id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not create order' });
  }
};

exports.paymentStatus = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const response = await cashfree.PGFetchOrder(orderId);
    const status = response.data.order_status;

    const order = await Order.findOne({ where: { orderId } });
    if (!order) return res.status(404).send('Order not found');

    order.status = status;
    await order.save();

    if (status === 'PAID') {
      const user = await User.findByPk(order.userId);
      if (user) {
        user.isPremium = true;
        await user.save();
      }
      return res.sendFile(path.join(__dirname, '../views/paymentSuccess.html'));
    } else {
      res.send('Payment not completed yet');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Payment check failed');
  }
};
