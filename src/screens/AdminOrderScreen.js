import { getUserInfo } from "../localStorage.js";

function menu(props) {
    return `
    <div class="dashboard-menu">
        <ul>
            <li class="${props.selected === 'dashboard' ? 'selected' : ''}">
                <a href="/#/dashboard">Dashboard</a>
            </li>
            <li class="${props.selected === 'orders' ? 'selected' : ''}">
                <a href="/#/orderlist">Orders</a>
            </li>
            <li class="${props.selected === 'products' ? 'selected' : ''}">
                <a href="/#/productlist">Products</a>
            </li>
        </ul>
    </div>
    `
}

const AdminOrderScreen = {
        after_render: () => {
            const detailButtons = document.getElementsByClassName('order-details');
            Array.from(detailButtons).forEach((detailButton) => {
                console.log("nnnnnnnn");
                detailButton.addEventListener('click', () => {
                    console.log("oooooooooo");
                    document.location.hash = `/orderdetail/${detailButton.id}`;
                });
            });

            const order_deletes = document.getElementsByClassName('hide');
            Array.from(order_deletes).forEach((order_delete) => {
                order_delete.addEventListener('click', () => {
                    if (confirm('Are you sure to delete this product?')) {
                        firebase.database().ref("Orders/" + order_delete.id).remove();
                    }

                });
            });

        },
        render: (allOrder) => {
                console.log('ADM ORDERS', allOrder);
                if (!getUserInfo().isAdmin) {
                    document.location.hash = '/';
                }
                return `
        <div class="col-lg-3 col-12 dashboard1">
            ${menu({ selected: 'orders' })}
            
        </div>
        <div class="col-lg-9 col-12 ">
            <h1>Orders</h1>
            <div class="adminOrder2">
            ${
                allOrder.length === 0
                ? `<tr><td colspan="6">No Order Found.</tr>`
                : allOrder.map((order,index) =>`
                <div>
                <ul>
                    <li>
                        <h5> Order No. ${index + 1} 
                        <a href="/#/orderlist"><i class="fa fa-remove hide" id="${order.order_id}" style="font-size:20px;color:rgb(219, 52, 80);"></i></a>
                        </h5>
                    </li>
                    <li>
                        <span> Customer Name :</span> ${order.userName}                     
                    </li> 
                    <li>
                    <span> Order Date :</span> ${order.orderDate}
                    </li>  
                    <li class=" ${order.isDelivered ? 'btn-color-change' : ''}  delivery-btn">    
                        <button class="order-details" id="${order.order_id}">Order Details</button>         
                    </li>
                </ul>
                </div>
                    
                    `).join('\n')}
            </div>
        </div>
        `
    }
}
export default AdminOrderScreen;


// <div>
//                     <div class="order-div-1 ">
//                         <img src="./images/sw5.jpg" alt="">
//                         <ul>
//                             <li>
//                                 Name: Kaju Katli
//                             </li>
//                             <li>
//                                 Price: Rs 74
//                             </li>
//                             <li>
//                                 Address: Laxmi Nagar Chandmari, Khamgaon
//                             </li>
//                         </ul>
//                     </div>
//                 </div>