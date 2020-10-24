import data from '../data.js';

const HomeScreen = {
        render: (keys) => {
                // const { products } = data;
                console.log("MAPS ", keys);

                return `
        ${keys.map(
            (product) => `
            
            <div class="col-lg-3 col-12 main-card" >
                <div class="card text-center">
                    <div class="card-body product" >
                        <a href="/#/product/${product._id}">
                            <img src="${product.image}" alt="${product.name}" />
                        </a>
                        <div class="card-details">
                            <div class="product-name">
                                <a href="/#/product/${product._id}">
                                    ${product.name}
                                </a>
                            </div>
                            <div class="product-brand">
                                ${product.brand}
                            </div>
                            <div class="product-price">
                                Rs ${product.price} / Kg
                            </div>
                        </div>
                    </div>
                    <a href="/#/product/${product._id}">
                        <li class="product-btn">
                            <button id="add-button">View Product <i class="fa fa-shopping-cart"
                            style="font-size:22px;color:white; padding: 0px 0px 0px 15px;"></i></button>
                        </li>
                    </a>
                </div>
                
            </div>
        
        `   
        ).join('\n')}
        
        `
    }
}

export default HomeScreen;


// <div class="card-footer">
//                     <a href="/#/product/${product._id}">Add To Cart <i class="fa fa-shopping-cart"
//                     style="font-size:22px;color:white; padding: 0px 00px 0px 15px;"></i></a>
//                 </div>