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

const ProductListScreen = {
        after_render: () => {
            document.getElementById('create-product-button')
                .addEventListener('click', () => {
                    document.location.hash = '/productcreate';
                });

            // PRODUCT EDIT //
            const editButtons = document.getElementsByClassName('edit-button');
            Array.from(editButtons).forEach((editButton) => {
                editButton.addEventListener('click', () => {
                    document.location.hash = `/edit/${editButton.id}/product`;
                });
            });

            // DELETE SECTION FROM FIREBASE DATABASE START //
            const deleteButtons = document.getElementsByClassName('delete-button');
            Array.from(deleteButtons).forEach((deleteButton) => {
                deleteButton.addEventListener('click', async() => {
                    if (confirm('Are you sure to delete this product?')) {
                        firebase.storage().ref("ProductsImg/" + deleteButton.id + ".png").delete();
                        firebase.database().ref("allProducts/" + deleteButton.id).remove();
                    }
                });
            });
            // DELETE SECTION FROM FIREBASE DATABASE END //
        },

        render: (allProducts) => {

                if (!getUserInfo().isAdmin) {
                    document.location.hash = '/';
                }
                return `
        <div class="col-lg-3 col-12 dashboard1">
            ${menu({ selected: 'products' })}
            
        </div>

        <div class="col-lg-9 col-12 dashboard2">
            <h1>Products</h1>
            <button id="create-product-button" class="primary">
                Create Product
            </button>
            <div class="profile-orders">
                <table width="100%" height="20%" class="profile-action-table">
                    <thead>    
                        <tr>
                            <th>PRODUCT ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>

                    <tbody class="product_list_body">
                        ${
                            allProducts.length === 0
                        ? `<tr><td colspan="6">No Product Found.</tr>`
                        : allProducts.map((product) => `
                            <tr>
                                <td>${product._id}</td>
                                <td>${product.name}</td>
                                <td>${product.price}</td>
                                <td>${product.category}</td>
                                <td>${product.brand}</td>
                                <td>
                                    <button id="${product._id}" class="edit-button">Edit</button>
                                    <button id="${product._id}" class="delete-button">Delete</button>
                                </td>
                            </tr>
                            `
                            )
                            .join('\n')
                        }
                        
                    </tbody>
                    
                </table>
            </div
        </div>
        `
    }
}
export default ProductListScreen;



// <tbody>
//                         ${
//                             allOrders.length === 0
//                         ? `<tr><td colspan="6">No Order Found.</tr>`
//                         : allOrders.map((order) => `
//                             <tr>
//                             <td>${order.order_id}</td>
//                             <td>${order.orderDate.slice(0,10)}</td>
//                             <td>${order.totalPrice}</td>
//                             <td>${order.deliveredAt || 'No'}</td>
//                             <td><a href="/#/order/${order.order_id}">DETIALS</a> </td>
//                             </tr>
//                             `
//                             )
//                             .join('\n')
//                         }
//                     </tbody>