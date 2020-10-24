import { setPayment } from '../localStorage.js';
import { CheckoutSteps } from '../utils.js';

const PaymentScreen = {
    after_render: () => {
        document.getElementById('payment-form')
            .addEventListener('submit', async(e) => {
                e.preventDefault();
                const paymentMethod = document.querySelector(
                    'input[name="payment-method"]:checked'
                ).value;
                setPayment({ paymentMethod });
                document.location.hash = '/placeorder';
            });
    },
    render: () => {
        return `
        <div class="shipping-status">
            ${CheckoutSteps({ step1: true, step2: true, step3: true})}
        </div>
        <div class="col-lg-12 col-12 form-container">
            <form id="payment-form">
                <ul class="form-items">
                    <li>
                        <h1>Payment</h1>
                        <p > We accept payment at your door stape with method you select </p>
                    </li>
                    <li>
                        <div class="payment-input">
                            <input type="radio" name="payment-method" id="Google Pay"
                                value="Google Pay"
                                checked />
                            <label for="Google Pay" >Google Pay</label>
                        </div> 
                    </li>
                    <li>
                        <div class="payment-input">
                            <input type="radio" name="payment-method" id="Phone Pay"
                            value="Phone Pay"/>
                            <label for="Phone Pay" >Phone Pay</label>
                        </div> 
                    </li>
                    <li>
                        <div class="payment-input">
                            <input type="radio" name="payment-method" id="Cash"
                            value="Cash On Delivery"
                            />
                            <label for="Cash">Cash On Delivery</label>
                        </div> 
                    </li>
                    <li>
                        <button type="submit" class="primary">Continue <i class="fa fa-arrow-right" style="font-size:14px;margin-left:8px"></i></button>
                    </li>        
                </ul>
            </form>
        </div>
        <div class="col-lg-12 col-12 form-container">
        </div>

        `
    }
}

export default PaymentScreen;