const ContactScreen = {
    after_render: () => {
        document.getElementById("email-btn").onclick = function(e) {
            // e.preventDefault();
            console.log('hELLOOOOOO')
            Email.send({
                Host: "smtp.gmail.com",
                Username: "shubhsharmass242424@gmail.com",
                Password: "shubhss24@",
                To: 'shubhsharmass24@gmail.com',
                From: "shubhsharmass242424@gmail.com",
                Subject: "This is the subject",
                Body: "And this is the body welcome SHUBHAM"
            }).then(
                //console.log("ERR"),
                message => alert(message)
            );

        }

    },
    render: () => {
        return `
        <div class="container cnt-heading text-center">
            <h1 class="text-cent font-weight-bold">CONTACT US</h1>
        </div>
        <div class="col-lg-8 col-md-8 col-10 offset-lg-2 offset-md-2 offset-1">
            <form >
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Enter Name" id="username" required="required">
                </div>

                <div class="form-group">
                    <input type="email" class="form-control" placeholder="Enter email" id="email" required="required">
                </div>

                <div class="form-group">
                    <input type="tel" class="form-control" placeholder="Enter Mobile No" id="mobile" pattern="[7890][0-9]{9}" required="required" >
                </div>

                <div class="form-group">
                    <textarea class="form-control" rows="5" id="message" placeholder="Enter Your Message" required="required" ></textarea>
                </div>
                <div class="d-flex justify-content-center form-button">
                    <button type="submit" id="email-btn" class="btn ">Submit</button>
                </div>
            </form>
        </div>
            <div class="footer">
            <div class="col-lg-4 col-md-4 col-12 ">
                <div class="text-center footer-bg">
                <i class="fa fa-map-marker-alt" style="font-size:30px;color:rgb(137, 48, 172)"></i><br>
                    <div class="footer-div">
                        <p>Address</p>
                        <p>Laxmi Nagar, Chandmari</p>
                        <span>Khamgaon, 444 303 </span>
                    </div>
                    <hr class="visible-xs" style="border: 1px solid rgb(137, 48, 172); width: 180px;">
                </div>
            </div>

            <div class="col-lg-4 col-md-4 col-12 ">
                <div class="text-center footer-bg">
                    <i class="fa fa-envelope footer-icon" style="font-size:30px;color:rgb(137, 48, 172);font-weight:250"></i><br>
                    <div class="footer-div">
                        <p class="contact-txt">General Enquiries</p>
                        <span>shubhsharmass24@gmail.com</span>
                    </div>
                    <hr class="visible-xs text-center" style="border: 1px solid rgb(137, 48, 172); width: 180px;">
                </div>
            </div>

            <div class="col-lg-4 col-md-4 col-12">
                <div class="text-center footer-bg">
                    <i class="fa fa-phone" style="font-size:30px;color:rgb(137, 48, 172)"></i><br>
                    <div class="footer-div">
                        <p>Call Us</p>
                        <p>+91-8983222814</p>
                        <span>+91-8983222814</span><br>
                    </div>
                    <hr class="visible-xs" style="border: 1px solid rgb(137, 48, 172); width: 180px;">
                </div>
            </div>

            <div class="col-lg-12 col-md-12 col-12">
                <div class="text-center footer-bg">
                    <i class="fa fa-clock-o" style="font-size:30px;color:rgb(137, 48, 172)"></i><br>
                    <div class="footer-div">
                        <p>Hours : </p>
                        <p> Mon-Fri : 11.00am - 7.00pm</p>
                        <p> Sat : 11.00am - 2.00pm</p>
                        <span>Sunday Closed</span>
                    </div>
                    <hr class="visible-xs" style="border: 1px solid rgb(137, 48, 172); width: 180px;">
                </div>
            </div>
        </div><br>

        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-12 ">
                    <div class="d-flex justify-content-center map-responsive">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.1254967038744!2d76.57432921440201!3d20.705127904124655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd7511e1466c069%3A0xf7acb51cde2c9208!2sChintamani%20Ganpati%20mandir!5e0!3m2!1sen!2sus!4v1596281062157!5m2!1sen!2sus"
                            style="border:2px solid white;" allowfullscreen>
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
        </div>
        `
    }
}

export default ContactScreen;