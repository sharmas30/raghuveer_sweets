import { getUserInfo, setUserInfo } from '../localStorage.js';
import { CheckoutSteps, hideLoading, redirectUser, showLoading } from '../utils.js';

function signin() {
    showLoading();
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
        var Uphone_number, Uname, Uemail, user_id, UisAdmin;
        var User_Data = {};
        // alert('User Sign In successfully');
        hideLoading();
        user_id = firebase.auth().currentUser.uid;

        firebase.database().ref("Users/" + user_id)
            .on("value", function(snapshot) {

                Uname = snapshot.val().userName;
                Uphone_number = snapshot.val().user_Phone_number;
                Uemail = snapshot.val().email;
                UisAdmin = snapshot.val().isAdmin;

                User_Data = {
                    _id: user_id,
                    name: Uname,
                    Uphone_number: Uphone_number,
                    email: Uemail,
                    password: password,
                    isAdmin: UisAdmin,
                };
                setUserInfo(User_Data);
                document.location.hash = '/dashboard';

                // redirectUser();
            });

    }).catch(function(error) {
        var errorcode = error.code;
        var errormsg = error.message;
        alert('Invalid Id or Password Signin');
        hideLoading();
    })
}

function reset() {

    var email = document.getElementById('email').value;
    if (email) {
        firebase.auth().sendPasswordResetEmail(email).then(function() {
            alert('password reset link sent to your Email Address successfully ');
        }).catch(function(error) {
            var errormsg = error.message;
            alert('email Id is not valid', errormsg);
        });
    } else {
        alert('please enter your email address');
    }

}


const SigninScreen = {
    after_render: () => {
        document.getElementById('signin-form')
            .addEventListener('submit', (e) => {
                e.preventDefault();
                signin();
            })
        document.getElementById('forget_password')
            .addEventListener('click', (e) => {
                e.preventDefault();
                reset();
            })
    },
    render: () => {
        if (getUserInfo().name) {
            redirectUser();
        }
        return `
        
        <div class="shipping-status">
            ${CheckoutSteps({ step1: true })}
        </div>
        <div class="col-lg-12 col-12 form-container">
            <form id="signin-form">
                <ul class="form-items">
                    <li>
                        <h1>Sing In</h1>
                    </li>
                    <li>
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" required="required" />
                    </li>
                    <li>
                        <label for="password">password</label>
                        <input type="password" name="password" id="password"  required="required" />
                    </li>
                    <li>
                        <button type="submit" class="primary">Signin </button>
                    </li>
                    <div id="forget_password" class="forget-pass"> 
                        <a> Forget Password </a>
                    </div>
                </ul>
            </form>
        </div>
        `;
    }
}
export default SigninScreen;


// <div class="new-user">
//                         New User ?
//                         <a href="/#/register">Create Your Account </a>
//                     </div>