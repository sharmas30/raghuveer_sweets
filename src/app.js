import HomeScreen from './screens/HomeScreen.js'
import ProductScreen from './screens/ProdutScreen.js';
import { hideLoading, parseRequestUrl, showLoading } from './utils.js';
import CartScreen from './screens/CartScreen.js';
import Error404Screen from './screens/Error404Screen.js';
import ShippingScreen from './screens/ShippingScreen.js';
import PaymentScreen from './screens/PaymentScreen.js';
import PlaceOrderScreen from './screens/PlaceOrderScreen.js';
import SigninScreen from './screens/SigninScreen.js';
import RegisterScreen from './screens/RegisterScreen.js';
import OrderScreen from './screens/OrderScreen.js';
import Header from './Header.js';
import ProfileScreen from './screens/ProfileScreen.js';
import DashboardScreen from './screens/DashboardScreen.js';
import { getUserInfo } from './localStorage.js';
import ProductListScreen from './screens/ProductListScreen.js';
import ProductCreatetScreen from './screens/ProductCreateScreen.js';
import ProductEditScreen from './screens/ProductEditScreen.js';
import AdminOrderScreen from './screens/AdminOrderScreen.js';
import ContactScreen from './screens/ContactScreen.js';


// DB-1 CONFIGURATIONS START //
var firebaseConfig = {
    apiKey: "AIzaSyA27W8PqjFVkfOguQqokSwtMLTrBtnzV5w",
    authDomain: "sharmasstore-dc238.firebaseapp.com",
    databaseURL: "https://sharmasstore-dc238.firebaseio.com",
    projectId: "sharmasstore-dc238",
    storageBucket: "sharmasstore-dc238.appspot.com",
    messagingSenderId: "336064829790",
    appId: "1:336064829790:web:496137dd59d41bfd6317cf"
};

// DB-2 CONFIGURATIONS START //

// var firebaseConfig = {
//     apiKey: "AIzaSyA27W8PqjFVkfOguQqokSwtMLTrBtnzV5w",
//     authDomain: "sharmasstore-dc238.firebaseapp.com",
//     databaseURL: "https://sharmasstore-dc238.firebaseio.com",
//     projectId: "sharmasstore-dc238",
//     storageBucket: "sharmasstore-dc238.appspot.com",
//     messagingSenderId: "336064829790",
//     appId: "1:336064829790:web:496137dd59d41bfd6317cf"
// };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let dataBase = firebase.database();
var ref = dataBase.ref('allProducts');

// DB-2 CONFIGURATIONS END //

const routes = {
    '/': HomeScreen,
    '/edit/:id/product': ProductEditScreen,
    '/product/:id': ProductScreen,
    '/orderdetail/:id': OrderScreen,
    '/cart/:id': CartScreen,
    '/cart': CartScreen,
    '/order/:id': OrderScreen,
    '/signin': SigninScreen,
    '/register': RegisterScreen,
    '/profile': ProfileScreen,
    '/shipping': ShippingScreen,
    '/payment': PaymentScreen,
    '/placeorder': PlaceOrderScreen,
    '/dashboard': DashboardScreen,
    '/productlist': ProductListScreen,
    '/productcreate': ProductCreatetScreen,
    '/orderlist': AdminOrderScreen,
    '/contact': ContactScreen,
};

const router = () => {
    const request = parseRequestUrl();
    console.log("Request ", request);
    const parseUrl =
        (request.resource ? `/${request.resource}` : '/') +
        (request.id ? '/:id' : '') +
        (request.verb ? `/${request.verb}` : '');
    console.log("parseUrl ", parseUrl);
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

    if (screen === HomeScreen)
        showLoading();
    const header = document.getElementById("mySidenav");
    header.innerHTML = Header.render()

    const main = document.getElementById('main-container');

    ref.on('value', getData)

    function getData(data) {
        console.log(data.val());
        if (screen === HomeScreen || screen === ProductListScreen) {
            var allProducts = data.val();
            var keys = Object.values(allProducts);
            main.innerHTML = screen.render(keys);
            if (screen.after_render) screen.after_render();
            hideLoading();

        } else if (screen === ProfileScreen) {
            var ar = [];
            const { _id } = getUserInfo();
            console.log('APP ID', _id);

            let dataBase = firebase.database();
            var ref = dataBase.ref('Orders');

            ref.orderByChild("user_id").equalTo(_id)
                .on("child_added", function(snapshot) {
                    var userOrders = snapshot.val()
                    ar.push(userOrders);
                    main.innerHTML = screen.render(ar);
                    if (screen.after_render) screen.after_render();
                });
        } else if (screen === OrderScreen) {
            console.log("GGGGG");
            firebase
                .database()
                .ref("Orders/" + request.id)
                .on("value", function(snapshot) {
                    var allData = snapshot.val()
                    main.innerHTML = screen.render(allData);
                    if (screen.after_render) screen.after_render();
                })
        } else if (screen === ProductEditScreen) {
            var productID = request.id;
            firebase
                .database()
                .ref("allProducts/" + productID)
                .on("value", function(snapshot) {
                    var productObj = snapshot.val()
                    main.innerHTML = screen.render(productObj);
                    if (screen.after_render) screen.after_render();
                });
        } else if (screen === DashboardScreen || screen === AdminOrderScreen) {
            firebase.database()
                .ref("Orders/")
                .on("value", function(snapshot) {
                    var allOrder = snapshot.val()
                    allOrder = Object.values(allOrder);
                    console.log("all Orderss", allOrder);
                    main.innerHTML = screen.render(allOrder);
                    if (screen.after_render) screen.after_render();
                })
        } else {
            main.innerHTML = screen.render();
            if (screen.after_render) screen.after_render();

        }
    }
};
window.addEventListener('load', router);
window.addEventListener('hashchange', router);





// if (screen !== OrderScreen && screen !== ProfileScreen) {
//     main.innerHTML = screen.render(keys);
//     if (screen.after_render) screen.after_render();

// } else if (screen === ProfileScreen) {
//     var ar = [];
//     const { _id } = getUserInfo();
//     console.log('APP ID', _id);

//     let dataBase = firebase.database();
//     var ref = dataBase.ref('Orders');

//     ref.orderByChild("user_id").equalTo(_id)
//         .on("child_added", function(snapshot) {
//             var allOrders = snapshot.val()
//             ar.push(allOrders);
//             main.innerHTML = screen.render(ar);
//             if (screen.after_render) screen.after_render();
//         });
// } else {
//     firebase
//         .database()
//         .ref("Orders/" + request.id)
//         .on("value", function(snapshot) {
//             var allData = snapshot.val()
//             main.innerHTML = screen.render(allData);
//             if (screen.after_render) screen.after_render();
//         })
// }