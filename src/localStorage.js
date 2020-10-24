export const getCartItems = () => {
    const cartItems = localStorage.getItem('cartItems') ?
        JSON.parse(localStorage.getItem('cartItems')) : [];
    return cartItems;
};
export const setCartItems = (cartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

/////////////////////

export const setUserInfo = ({
    _id = '',
    name = '',
    email = '',
    password = '',
    Uphone_number = '',
    isAdmin = false,
}) => {
    localStorage.setItem('userInfo', JSON.stringify({
        _id,
        name,
        email,
        password,
        Uphone_number,
        isAdmin,
    }));
};
export const clearUser = () => {
    localStorage.removeItem('userInfo');
};

export const getUserInfo = () => {
    return localStorage.getItem('userInfo') ?
        JSON.parse(localStorage.getItem('userInfo')) : { name: '', email: '', password: '' };
};

////////////////////

export const getShipping = () => {
    const shipping = localStorage.getItem('shipping') ?
        JSON.parse(localStorage.getItem('shipping')) : {
            address: '',
            city: '',
            postalCode: '',
            country: '',
            phone_number: '',
            name: '',
        };
    return shipping;
};

export const setShipping = ({
    address = '',
    city = '',
    postalCode = '',
    country = '',
    phone_number = '',
    name = '',
}) => {
    localStorage.setItem('shipping',
        JSON.stringify({ address, city, postalCode, country, phone_number, name })
    );
};

export const getPayment = () => {
    const payment = localStorage.getItem('payment') ?
        JSON.parse(localStorage.getItem('payment')) : {
            paymentMethod: 'Google Pay',
        };
    return payment;
};
export const setPayment = ({ paymentMethod = 'Google Pay' }) => {
    localStorage.setItem('payment', JSON.stringify({ paymentMethod }));
};

export const cleanCart = () => {
    localStorage.removeItem('cartItems');
};