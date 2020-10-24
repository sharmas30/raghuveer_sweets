import { getUserInfo } from "../localStorage.js";
import { parseRequestUrl } from "../utils.js";

var input, image, imgName, brand, category, reader, price, name, product_id;
var files = [];


const ProductEditScreen = {
    after_render: () => {

        //--------------------- SELECTION PROCESS START------------------------//

        document.getElementById("select").onclick = function(e) {

            input = document.createElement("input");
            input.type = "file";
            input.onchange = (e) => {
                files = e.target.files;
                reader = new FileReader();
                reader.onload = function() {
                    document.getElementById("myimg").src = reader.result;
                };
                reader.readAsDataURL(files[0]);
            };
            input.click();
        };

        //--------------------- SELECTION PROCESS END------------------------//

        //----- UPLOAD PICTURE TO STORAGE & REALTIME DATABASE START --------//

        document.getElementById("upload").onclick = function(e) {
                e.preventDefault();
                const request = parseRequestUrl();

                var d = new Date();
                var product_date_1 = d.toLocaleString();
                var n = d.toISOString();
                var product_date_2 = product_date_1.replace(/\//g, '')

                name = document.getElementById('name').value
                price = document.getElementById('price').value
                brand = document.getElementById('brand').value
                category = document.getElementById('category').value
                product_id = request.id;

                if (files[0] === undefined)
                    alert("Please Upload The Image Again")

                var uploadTask = firebase
                    .storage()
                    .ref("ProductsImg/" + product_id + ".png")
                    .put(files[0]);

                uploadTask.on(
                    "state_changed",
                    function(snapshot) {
                        var progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        document.getElementById("UpProgress").innerHTML =
                            "Upload" + progress + "%";
                    },

                    function(error) {
                        alert("error in saving the image ", error);
                    },

                    function() {
                        uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
                            image = url;
                            product_id = request.id;
                            console.log("IDD ", product_id);
                            firebase
                                .database()
                                .ref("allProducts/" + product_id)
                                .update({
                                    _id: product_id,
                                    name: name,
                                    brand: brand,
                                    category: category,
                                    price: price,
                                    image: image,
                                });
                            alert("Data updated successfully ");
                        });
                    }
                );
            }
            //----- UPLOAD PICTURE TO STORAGE & REALTIME DATABASE END ------//


    },

    render: (productObj) => {
        // var productObj;
        console.log("EDIT SCREEN ", productObj);;
        if (!getUserInfo().isAdmin) {
            document.location.hash = '/';
        }

        return `           
        <div class="col-lg-12 col-12 form-container">
            <form id="edit-product-form">
                <ul class="form-items">
                    <li>
                        <h1>Edit Product</h1>
                    </li>
                    <li>
                        <label for="name">Product Name</label>
                        <input type="text" name="name" id="name" value="${productObj.name}" required="required" />
                    </li>
                    <li class="primary-btn"><h5 style="font-weight:bold; color:red">Please upload the image again</h5>
                        <img id="myimg" src="${productObj.image}" value="${productObj.image}" required="required"/> <label id="UpProgress" ></label>
                        <div id="select" >Choose File <i class="fa fa-paperclip" style='padding:4px;' aria-hidden="true"></i></div>
                    </li>
                    <li>
                        <label for="price">Product Price</label>
                        <input type="number" name="price" id="price" value="${productObj.price}" required="required" />
                    </li>
                    <li>
                        <label for="brand">Brand</label>
                        <input type="text" name="brand" id="brand" value="${productObj.brand}" required="required" />
                    </li>
                    <li>
                        <label for="category">Category</label>
                        <input type="text" name="category" id="category" value="${productObj.category}" required="required" />
                    </li>
                    
                    <li>
                        <button id="upload" type="submit" class="primary">Submit </button>
                    </li>
                </ul>
            </form>
        </div>
        `;
    }
}
export default ProductEditScreen;