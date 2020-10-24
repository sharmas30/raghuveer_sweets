import { getCartItems, getUserInfo } from "./localStorage.js";

export const parseRequestUrl = () => {
    const url = document.location.hash.toLowerCase();
    const request = url.split('/');
    return {
        resource: request[1],
        id: request[2],
        verb: request[3],
    };
};

export const rerender = (component) => {
    document.getElementById('main-container').innerHTML = component.render();
    component.after_render();
}

export const redirectUser = () => {

    console.log(getCartItems().length);
    if (getCartItems().length !== 0) {
        document.location.hash = '/shipping';
    } else {
        document.location.hash = '/';
    }
};

export const showLoading = () => {
    document.getElementById('loading-overlay').classList.add('scet');
};

export const hideLoading = () => {
    document.getElementById('loading-overlay').classList.remove('scet');
};

export const CheckoutSteps = (props) => {
    return `
		<div class="checkout-steps">
		<div class="${props.step1 ? 'active' : ''}">SignIn</div>
        <div class="${props.step2 ? 'active' : ''}">Shipping</div>
		<div class="${props.step3 ? 'active' : ''}">Payment</div>
		<div class="${props.step4 ? 'active' : ''}">Place Order</div>
		</div>
    `;
}