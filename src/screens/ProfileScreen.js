// import { getMyOrders } from "../api.js";
import { clearUser, getUserInfo } from "../localStorage.js";

const ProfileScreen = {
        after_render: () => {
            document.getElementById('signout-button').addEventListener('click', () => {
                clearUser();
                document.location.hash = '/';
            });
        },
        render: (allOrders) => {

                const { name, email } = getUserInfo();
                console.log("OrdeRSS ", allOrders);
                if (!name) {
                    document.location.hash = '/';
                }

                return `
        
        <div class="col-lg-4 col-12 form-container user-profile">
            <form id="signin-form1">
                <ul class="form-items">
                    <li>
                        <h1>User Profile</h1>
                    </li>
                    <li>
                        <label for="name">Name</label>
                        <input type="name" name="name" id="name" value = ${name} required="required" />
                    </li>
                    <li>
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" value = ${email} required="required" />
                    </li>
                    
                    <li>
						<button type="button" id="signout-button">Sign Out</button>
					<li>
                </ul>
            </form>
        </div>
        <div class="col-lg-8 col-12 pro-height">
            <div class="profile-orders">
                <h2>Order History</h2>
                <table width="100%" height="20%" class="profile-action-table">
                    <thead>    
                        <tr>
                            <th>order id</th>
                            <th>Date</th>
                            <th> total</th>
                            <th>delivered</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${
                            allOrders.length === 0
                        ? `<tr><td colspan="6">No Order Found.</tr>`
                        : allOrders.map((order) => `
                            <tr>
                            <td>${order.order_id}</td>
                            <td>${order.orderDate.slice(0,10)}</td>
                            <td>${order.totalPrice}</td>
                            <td>${order.deliveredAt || 'No'}</td>
                            <td><a href="/#/order/${order.order_id}">DETIALS</a> </td>
                            </tr>
                            `
                            )
                            .join('\n')
                        }
                        
                    </tbody>
                    
                </table>
                
            </div>
        </div>
        `;
    }
}
export default ProfileScreen;


// <table width="100%" height="20%">
//                     <thead width="100%" height="20%">
//                         <tr>
//                         <th>ORDER ID</th>
//                         <th>DATE</th>
//                         <th>TOTAL</th>
//                         <th>DELIVERED</th>
//                         <th>ACTIONS</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         ${
//                             allOrders.length === 0
//                         ? `<tr><td colspan="6">No Order Found.</tr>`
//                         : allOrders.map((order) => `
//                             <tr>
//                             <td>${order.order_id}</td>
//                             <td>${order.createdAt}</td>
//                             <td>${order.totalPrice}</td>
//                             <td>${order.deliveredAt || 'No'}</td>
//                             <td><a href="/#/order/${order.order_id}">DETIALS</a> </td>
//                             </tr>
//                             `
//                             )
//                             .join('\n')
//                         }
//                     </tbody>
//                 </table>