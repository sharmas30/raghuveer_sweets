import { cleanCart, getCartItems, getPayment, getShipping, getUserInfo } from "../localStorage.js";
import { CheckoutSteps } from '../utils.js';


const convertCartToOrder = () => {
    const orderItems = getCartItems();
    if (orderItems.length === 0) {
        document.location.hash = '/cart';
    }
    const shipping = getShipping();
    if (!shipping.address) {
        document.location.hash = '/shipping';
    }
    const payment = getPayment();
    if (!payment.paymentMethod) {
        document.location.hash = '/payment';
    }
    const itemsPrice = orderItems.reduce((a, c) => a + c.price * c.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = Math.round(0.15 * itemsPrice * 100) / 100;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
    return {
        orderItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
    };
};

const PlaceOrderScreen = {
        after_render: () => {
            document.getElementById('placeorder-button')
                .addEventListener('click', () => {
                    const order = convertCartToOrder();
                    var d = new Date();
                    var order_date = d.toLocaleString();
                    // var order_date = order_date.replace(/\//g, '')
                    var n = d.toISOString();
                    var id = n.split(':')[0] + n.split(':')[1] + n.split(':')[2].slice(0, 6)
                    var order_id = id.replace(/-/g, '').replace('.', '').replace('T', '');

                    //send orders to database //

                    firebase.database().ref('Orders/' + order_id).set({
                        orderItems: order.orderItems,
                        shipping: order.shipping,
                        payment: order.payment,
                        itemsPrice: order.itemsPrice,
                        shippingPrice: order.shippingPrice,
                        taxPrice: order.taxPrice,
                        totalPrice: order.totalPrice,
                        orderDate: order_date,
                        order_id: order_id,
                        isDelivered: false,
                        deliveredAt: '',
                        // user_id: getUserInfo()._id,
                        // userName: getUserInfo().name,
                        // Uphone_number: getUserInfo().Uphone_number,
                    })
                    document.location.hash = `/order/${order_id}`;
                    cleanCart();
                })
        },
        render: () => {
                const {
                    orderItems,
                    shipping,
                    payment,
                    itemsPrice,
                    shippingPrice,
                    taxPrice,
                    totalPrice,
                } = convertCartToOrder();

                return `
            <div class="shipping-status">
                ${CheckoutSteps({ step1: true, step2: true, step3: true, step4: true})}
            </div>
            <div class="col-lg-8 col-12 order">
                <div class="address-info">
                    <h2>Shipping</h2>
                    <div>
                    <h4>
                        ${shipping.address}, ${shipping.city}
                        </h4>
                    </div>
                </div>
                <div class="payment-info">
                    <h2>Payment</h2>
                    <div>
                        <h4> Payment Method : ${payment.paymentMethod}</h4>
                    </div>
                </div>
                <div class="payment-info">
                    <table width="100%" height="20%" class="cart-table">
                        <tr class="plc-cart-r1">
                            <td width="130px">Shopping Cart</td>
                            <th></th>
                            <td style="text-align: center;">Price</td>
                        </tr>
                        ${orderItems.map((item) => `
                        <tr class="plc-cart-r2">
                            <td>
                                <hr style="border-top: 1px  #c0c0c0 solid; ">
                            </td>
                            <td>
                                <hr style="border-top: 1px  #c0c0c0 solid; width: 100%;">
                            </td>
                            <td>
                                <hr style="border-top: 1px  #c0c0c0 solid; width: 100%;">
                            </td>
                        </tr>
                        <tr class="place-order-cart plc-cart-r3 ">
                            <td >
                                <img src="${item.image}"  alt="${item.name}">
                            </td>
                            <th class="crt-detals-td" style="vertical-align:top">
                                <ul class="plc-order-style">
                                    <li>
                                        <h2> <a href="/#/product/${item.product}">${item.name}</a></h2>
                                    </li>
                                    <div class="plc-order-div">
                                        Qty : ${item.qty} kg
                                    </div>
                                </ul>
                            </th>
                            <td style="text-align: center;">
                              Rs. ${item.price}
                            </td>
                        </tr>
                        `
                        )
                        .join('\n')}
                    
                    </table>
                </div>
            </div>

            <div class="col-lg-4 col-12 order">
                <div class="order-info">
                    <h2>Order Summary</h2>
                    <table width="100%" height="20%" class="order-action-table">

                        <tr>
                            <td width="65%">Items</td>
                            <td>Rs. ${itemsPrice}</td>
                        </tr>
                        <tr>
                            <td>Shipping</td>
                            <td>Rs. ${shippingPrice}</td>
                        </tr>
                        <tr>
                            <td>Tax</td>
                            <td>Rs. ${taxPrice}</td>
                        </tr>
                        <tr>
                            <td>
                                <hr style="border-top: 1px solid gray;">
                            </td>
                            <td>
                                <hr style="border-top: 1px solid gray; width: 80%;">
                            </td>
                        </tr>
                        <tr>
                            <th>Order Total</th>
                            <th>Rs. ${totalPrice}</th>
                        </tr>
                    </table>
                    <div class="place-order-btn">
                        <button type="submit" id="placeorder-button" class="primary">Place Order </button>
                    </div>
                </div>
            </div>
        `
    }
}

export default PlaceOrderScreen;