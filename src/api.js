var Name, image, brand, _id, price, productCatg;
var allOrders = {};
export const getProduct = (id) => {
    firebase
        .database()
        .ref("allProducts/" + id)
        .on("value", function(snapshot) {
            console.log("SNP1 ", snapshot.val().name)
            console.log("SNP2 ", snapshot.val().image)
            _id = snapshot.val()._id;
            Name = snapshot.val().name;
            image = snapshot.val().image;
            brand = snapshot.val().brand;
            price = snapshot.val().price;
            productCatg = snapshot.val().productCatg;
        });
    return { Name: Name, image: image, brand: brand, price: price, _id: _id, productCatg: productCatg }
}

// export const createProducts = () => {

//     var input, image, imgName, brand, category, reader, price, name, _id;
//     var files = [];
//     //--------------------- SELECTION PROCESS START------------------------//

//     document.getElementById("select").onclick = function(e) {

//         input = document.createElement("input");
//         input.type = "file";
//         input.onchange = (e) => {
//             files = e.target.files;
//             reader = new FileReader();
//             reader.onload = function() {
//                 document.getElementById("myimg").src = reader.result;
//             };
//             reader.readAsDataURL(files[0]);
//         };
//         input.click();
//     };

//     //--------------------- SELECTION PROCESS END------------------------//

//     //----- UPLOAD PICTURE TO STORAGE & REALTIME DATABASE START --------//

//     document.getElementById("upload").onclick = function(e) {
//             e.preventDefault();

//             var d = new Date();
//             var product_date_1 = d.toLocaleString();
//             var n = d.toISOString();
//             var product_date_2 = product_date_1.replace(/\//g, '')
//             var id = n.split(':')[0] + n.split(':')[1] + n.split(':')[2].slice(0, 6)
//             var product_id = id.replace(/-/g, '').replace('.', '').replace('T', '');

//             name = document.getElementById('name').value
//             price = document.getElementById('price').value
//             brand = document.getElementById('brand').value
//             category = document.getElementById('category').value
//             imgName = product_date_2;


//             var uploadTask = firebase
//                 .storage()
//                 .ref("ProductsImg/" + imgName + ".png")
//                 .put(files[0]);

//             uploadTask.on(
//                 "state_changed",
//                 function(snapshot) {
//                     var progress =
//                         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                     document.getElementById("UpProgress").innerHTML =
//                         "Upload" + progress + "%";
//                 },

//                 function(error) {
//                     alert("error in saving the image ", error);
//                 },

//                 function() {
//                     uploadTask.snapshot.ref.getDownloadURL().then(function(url) {
//                         image = url;
//                         firebase
//                             .database()
//                             .ref("allProducts/" + product_id)
//                             .set({
//                                 _id: product_id,
//                                 name: name,
//                                 brand: brand,
//                                 category: category,
//                                 price: price,
//                                 image: image,
//                             });
//                         alert("image uploaded successfully ");
//                     });
//                 }
//             );
//         }
//         //----- UPLOAD PICTURE TO STORAGE & REALTIME DATABASE END ------//
// }