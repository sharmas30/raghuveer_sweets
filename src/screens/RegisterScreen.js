import { setUserInfo } from '../localStorage.js';
import { hideLoading, redirectUser, showLoading } from '../utils.js';


function register() {
    var name = document.getElementById('name').value;
    var phone_number = document.getElementById('phone_number').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var repassword = document.getElementById('repassword').value;

    showLoading();

    firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
        var Uphone_number, Uname, Uemail, user_id, UisAdmin;
        alert('User register successfully');
        hideLoading();
        user_id = firebase.auth().currentUser.uid;
        console.log("UDI ", user_id);
        firebase.database().ref('Users/' + user_id).set({
            userName: name,
            user_Phone_number: phone_number,
            email: email,
            isAdmin: false,
        })

        firebase.database().ref("Users/" + user_id)
            .on("value", function(snapshot) {
                Uname = snapshot.val().userName;
                Uphone_number = snapshot.val().user_Phone_number;
                Uemail = snapshot.val().email;
                UisAdmin = snapshot.val().isAdmin;
            });
        const data = {
            _id: user_id,
            name: Uname,
            Uphone_number: Uphone_number,
            email: Uemail,
            password: password,
            isAdmin: UisAdmin,
        };
        setUserInfo(data);
        redirectUser();

    }).catch(function(error) {
        var errorcode = error.code;
        var errormsg = error.message;
        alert('Invalid Id or Password register or Mail Id already registered', errormsg);
        hideLoading();
    })
}

const RegisterScreen = {
    after_render: () => {
        document.getElementById('register-form')
            .addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('333333333')

                register();
            })
    },
    render: () => {
        return `
        
        <div class="col-lg-12 col-12 form-container">
            <form id="register-form">
                <ul class="form-items">
                    <li>
                        <h1>Register</h1>
                    </li>
                    <li>
                        <label for="name">Name</label>
                        <input type="text" name="name" id="name" required="required" />
                    </li>
                    <li>
                        <label for="name">Phone Number</label>
                        <input type="tel" name="phone_number" id="phone_number"  pattern="[0789][0-9]{9}"  />
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
                        <label for="repassword">ReEnter Password</label>
                        <input type="password" name="repassword" id="repassword" />
                    </li>
                    
                    <li>
                        <button type="submit" class="primary">Register </button>
                    </li>
                    <div class="new-user">
                        Already have an account?
                        <a href="/#/signin">Sign In </a>
                    </div>
                </ul>
            </form>
        </div>
        
        `;
    }

}
export default RegisterScreen;