import { getUserInfo } from "../localStorage.js";
import { rerender } from "../utils.js";

var order_id, itemsPrice, orderItems, payment, shippingPrice, shipping, taxPrice, totalPrice;


const OrderScreen = {
        after_render: () => {
            // var deliverButton = document.getElementsByClassName('deliver')[0];
            // console.log('deliverButton', deliverButton)
            // deliverButton.addEventListener('click', (e) => {
            //     e.preventDefault();
            //     var orderID = deliverButton.id
            //     var d = new Date();
            //     var product_date_1 = d.toLocaleString();
            //     var n = d.toISOString();
            //     firebase.database()
            //         .ref("Orders/" + orderID)
            //         .update({
            //             deliveredAt: product_date_1,
            //             isDelivered: true,
            //         });
            //     document.location.hash = `/order/${deliverButton.id}`;
            // });

        },
        render: (allData) => {
                //const { isAdmin } = getUserInfo();
                const {
                    order_id,
                    userName,
                    Uphone_number,
                    itemsPrice,
                    orderItems,
                    payment,
                    shipping,
                    shippingPrice,
                    taxPrice,
                    totalPrice,
                    deliveredAt,
                    isDelivered,
                } = allData;


                return `
        <div class="col-lg-8 col-12 order">
            <h2>Order Id: ${order_id}</h2>
            <div class="address-info">
                <h2>Shipping </h2>
                <div>
                    <h4>
                       <span> Name :</span> ${shipping.name}
                    </h4>
                    <h4>
                       <span> Phone No :</span> ${shipping.phone_number}
                    </h4>
                    <h4><span> Address :</span> 
                        ${shipping.address}, ${shipping.city}, ${shipping.postalCode},
                        ${shipping.country}
                    </h4>
                    ${
                        isDelivered
                        ? `<div class="success">Delivered at ${deliveredAt}</div>`
                        : `<div class="error">Not Delivered</div>`
                    }
                </div>
            </div>
            <div class="payment-info">
                <h2>Payment</h2>
                <div>
                    <h4><span> Payment Method :</span> ${payment.paymentMethod}</h4>
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

        <div class="col-lg-4 col-12 order-sum">
            <div class="order-info">
                <h2>Order Summary</h2>
                <table width="100%" height="20%" class="order-action-table">

                    <tr>
                        <td width="55%">Items</td>
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
                
                </div>
            </div>
        </div>
        `
    }
}

export default OrderScreen;

// ${
//     isAdmin 
//     ? `<button id="${order_id}" class="primary fw deliver">Deliver Order</button>`
//     : `<p id="deliver-order-button"></p>`
// }