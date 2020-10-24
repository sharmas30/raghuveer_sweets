import { getProduct } from "../api.js";
import { parseRequestUrl } from "../utils.js";

var Name, image, brand, _id, price, productCatg;

// function getProduct(id) {
//     firebase
//         .database()
//         .ref("allProducts/" + id)
//         .on("value", function(snapshot) {
//             console.log("SNP1 ", snapshot.val().name)
//             console.log("SNP2 ", snapshot.val().image)
//             _id = snapshot.val()._id;
//             Name = snapshot.val().name;
//             image = snapshot.val().image;
//             brand = snapshot.val().brand;
//             price = snapshot.val().price;
//             productCatg = snapshot.val().productCatg;
//         });
// }

const ProductScreen = {
    after_render: () => {
        const request = parseRequestUrl();
        document.getElementById('add-button')
            .addEventListener('click', () => {
                document.location.hash = `/cart/${request.id}`;
            });
    },

    render: () => {
        const request = parseRequestUrl();
        console.log("REQ ", request);

        const data = getProduct(request.id);
        console.log("DATAA==> ", data);

        return `

        <div class="col-lg-4 col-12 product-scrn-img">
            <img src="${data.image}" alt="">
        </div>
        <div class="col-lg-4 col-12 product-desc">
            <ul class="ul-style">
                <li>
                    <h2>${data.Name}</h2>
                </li>
                <li>
                    Price : ${data.price}  / Kg
                </li>
                
                <li>
                    Brand : ${data.brand}
                </li>
                <li>
                    description : Yummy Sweet
                </li>
            </ul>
        </div>
        <div class="col-lg-4 col-12 product-action">
            <ul class="  ">
                <li>
                    Price : ${data.price} / Kg
                </li>
                <li>
                    status : In Stock
                </li>
                <li class="product-btn">
                    <button id="add-button">Add To Cart</button>
                </li>
                
            </ul>
        </div>      
        `
    }
}

export default ProductScreen;