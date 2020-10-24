import { CheckoutSteps } from '../utils.js';
import { getCartItems, getShipping, setShipping } from '../localStorage.js';

const ShippingScreen = {
    after_render: () => {
        document.getElementById('shipping-form')
            .addEventListener('submit', async(e) => {
                e.preventDefault();
                setShipping({
                    name: document.getElementById('name').value,
                    phone_number: document.getElementById('phone_number').value,
                    address: document.getElementById('address').value,
                    city: document.getElementById('city').value,
                });
                document.location.hash = '/payment';
            });
    },
    render: () => {
        const { address, city, postalCode, country, name, phone_number } = getShipping();
        if (getCartItems().length === 0) {
            document.location.hash = '/';
        }
        return `
        <div class="shipping-status">
            ${CheckoutSteps({ step1: true, step2: true})}
        </div>
        <div class="col-lg-12 col-12 form-container">
            <form id="shipping-form">
                <ul class="form-items">
                    <li>
                        <h1>Shipping Details</h1>
                    </li>
                    <li>
                        <label for="name">Name</label>
                        <input type="text" name="name" id="name" value="${name}" placeholder="First Name" required="required" />
                    </li>
                    <li>
                        <label for="name">Phone Number</label>
                        <input type="tel" name="phone_number" id="phone_number" placeholder="9999999999" pattern="[789][0-9]{9}" value="${phone_number}" required="required" />
                    </li>
                    <li>
                        <label for="address">Adress</label>
                        <input type="address"  name="address" id="address" value="${address}" placeholder="Complete Address"  />
                    </li>
                    <li>
                        <label for="city">City</label>
                        <input type="text" name="city" id="city" value="${city}" placeholder="City Name"  />
                    </li>
                    
                    <li>
                        <button type="submit" class="primary">Continue <i class="fa fa-arrow-right" style="font-size:14px;margin-left:8px"></i></button>
                    </li>
                </ul>
            </form>
        </div>
        
        `
    }

}
export default ShippingScreen;