import { getUserInfo } from "../localStorage.js";

var input, image, imgName, brand, category, reader, price, name, _id;
var files = [];

const ProductCreatetScreen = {
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

                var d = new Date();
                var product_date_1 = d.toLocaleString();
                var n = d.toISOString();
                //var product_date_2 = product_date_1.replace(/\//g, '')
                var id = n.split(':')[0] + n.split(':')[1] + n.split(':')[2].slice(0, 6)
                var product_id = id.replace(/-/g, '').replace('.', '').replace('T', '');

                name = document.getElementById('name').value
                price = document.getElementById('price').value
                brand = document.getElementById('brand').value
                category = document.getElementById('category').value

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
                            firebase
                                .database()
                                .ref("allProducts/" + product_id)
                                .set({
                                    _id: product_id,
                                    name: name,
                                    brand: brand,
                                    category: category,
                                    price: price,
                                    image: image,
                                });
                            alert("Product Created Successfully ");
                        });
                    }
                );
            }
            //----- UPLOAD PICTURE TO STORAGE & REALTIME DATABASE END ------//
    },

    render: () => {
        if (!getUserInfo().isAdmin) {
            document.location.hash = '/';
        }

        return `           
        <div class="col-lg-12 col-12 form-container">
            <form id="edit-product-form">
                <ul class="form-items">
                    <li>
                        <h1>Create Product</h1>
                    </li>
                    <li>
                        <label for="name">Product Name</label>
                        <input type="text" name="name" id="name" required="required" />
                    </li>
                    <li class="primary-btn">
                        <img id="myimg" src=""  required="required"/><label id="UpProgress" ></label>
                        <div id="select" >Choose File  <i class="fa fa-paperclip" style='padding:4px;font-size:15px;' aria-hidden="true"></i> </div>
                    </li>
                    <li>
                        <label for="price">Product Price</label>
                        <input type="number" name="price" id="price"  required="required" />
                    </li>
                    <li>
                        <label for="brand">Brand</label>
                        <input type="text" name="brand" id="brand" required="required" />
                    </li>
                    <li>
                        <label for="category">Category</label>
                        <input type="text" name="category" id="category"  required="required" />
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

export default ProductCreatetScreen;