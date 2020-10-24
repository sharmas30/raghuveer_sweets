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

const DashboardScreen = {
    after_render: () => {},
    render: (allOrder) => {
        var totalSale;
        if (!getUserInfo().isAdmin) {
            document.location.hash = '/signin';
        }

        return `
        
        <div class="col-lg-3 col-12 dashboard1">
            ${menu({ selected: 'dashboard' })}
            
        </div>

        <div class="col-lg-9 col-12 dashboard2">
            <h1>Dashboard</h1>
            <ul class="summary-items">
                
                <li>
                    <div class="summary-title color3">
                        <span><i class="fa fa-line-chart" style="font-size:22px;"></i>
                            Sales</span>
                    </div>
                     <div class="summary-body">
                     
                     Rs ${allOrder.reduce((a, c) => a + c.totalPrice, 0).toFixed(1)}
                     </div>
                </li>
            </ul>
        </div>
        `
    }
}

export default DashboardScreen;