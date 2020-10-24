import { getProduct } from "../api.js";
import { getCartItems, setCartItems } from "../localStorage.js";
import { parseRequestUrl, redirectUser, rerender } from "../utils.js";


const addToCart = (item, forceUpdate = false) => {
    let cartItems = getCartItems();
    const existItem = cartItems.find((x) => x.product === item.product);
    if (existItem) {
        if (forceUpdate) {
            cartItems = cartItems.map((x) =>
                x.product === existItem.product ? item : x
            );
        }
    } else {
        cartItems = [...cartItems, item];
    }
    setCartItems(cartItems);
    if (forceUpdate) {
        rerender(CartScreen);
    }
};

const removeFromCart = (id) => {
    setCartItems(getCartItems().filter(x => x.product !== id));
    if (id === parseRequestUrl().id) {
        document.location.hash = '/cart';
    } else {
        rerender(CartScreen);
    }
}

const CartScreen = {
        after_render: () => {
            const qtySelects = document.getElementsByClassName("qty-select");
            console.log("FF ", qtySelects);
            Array.from(qtySelects).forEach((qtySelect) => {
                qtySelect.addEventListener('change', (e) => {
                    const item = getCartItems().find((x) => x.product === qtySelect.id);
                    addToCart({...item, qty: Number(e.target.value) }, true);
                });
            });

            const deleteButton = document.getElementsByClassName("delete-button");
            Array.from(deleteButton).forEach(deleteButton => {
                deleteButton.addEventListener('click', () => {
                    removeFromCart(deleteButton.id)
                })
            })

            document.getElementById("checkout-button").addEventListener('click', () => {
                document.location.hash = '/shipping';
                //redirectUser();
            })
        },
        render: () => {
                const request = parseRequestUrl();
                if (request.id) {
                    const product = getProduct(request.id);
                    addToCart({
                        product: product._id,
                        name: product.Name,
                        image: product.image,
                        price: product.price,
                        brand: product.brand,
                        countInStock: product.countInStock,
                        qty: 1,
                    });
                }
                const cartItems = getCartItems();
                return `
            
            <div class="col-lg-8 col-12 cart-scrn-img">
                <table width="100%" height="20%" class="cart-table">
                    <tr class="cart-r1">
                        <th>Shopping</th>
                        <th></th>
                        <th style="text-align: center;">Price</th>
                    </tr>
                    ${cartItems.length === 0
                        ? '<div><h3>Cart is empty.  <a href="/#/">Go Shopping</a></h3></div>'
                        : cartItems.map((item) =>`
                    <tr class="cart-r2">
                        <td>
                            <hr>
                        </td>
                        <td>
                            <hr>
                        </td>
                        <td>
                            <hr>
                        </td>
                    </tr>
                    <tr class="cart-r3">
                        <td width="30%">
                            <img src="${item.image}"  alt="${item.name}">
                        </td>
                        <th width="50%" class="crt-detals-td" style="vertical-align:top">
                            <ul class="pd-ul-style">
                                <li>
                                    <h2>${item.name}</h2>
                                </li>
                                <div class="cart-detail-div">
                                    Qty :
                                    <input type="number" class="qty-select" id="${item.product}" name="quantity" min="1" max="15"  value="${item.qty}" step="0.5">  kg</input>
                                    <button type="button" class="delete-button" id="${item.product}">
                                        Delete
                                    </button>
                                </div>
                            </ul>
                        </th>
                        <td width="20%" style="text-align: center;">
                            Rs ${item.price}
                        </td>
                    </tr>
                    `).join('\n')}
                        
                </table>
            </div> 
            <div class="col-lg-4 col-12 product-cart-action">
                <ul class="ul-style ">
                    <li>
                    Subtotal (${cartItems.reduce((a, c) => a + c.qty, 0).toFixed(1)} items)
                    :
                    Rs ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                    </li>
                    <li class="product-btn" id="checkout-button">
                        <button>Proceed to Checkout <i class="fa fa-arrow-right" style="font-size:14px;margin-left:8px"></i></button>
                    </li>
                    <a href="/#/">
                    <li class="product-btn" id="checkout-button">
                        <button><i class="fa fa-arrow-left" style="font-size:14px;margin-right:8px"></i> Go More Shopping</button>
                    </li>
                    </a>
                </ul>
            </div>
    `;
    }
}
export default CartScreen;


//  Qty:  

//<input type="number" class="qty-select1" id="${item.product}" name="quantity" min="1" max="5" step="0.5" value="${item.qty}">  kg</input>