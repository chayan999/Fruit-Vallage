
import { useContext, useState } from 'react';
import firebaseConfig from './firebase.config';
import firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

function Login() {

    const provider = new firebase.auth.GoogleAuthProvider();
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        signInUser: false,
        name: '',
        email: '',
        password: '',
        photo: '',
    });
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const hendelSineIn = () => {
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                const { displayName, email, photoURL } = res.user
                console.log(res)
                const SignedInUser = {
                    singInUser: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(SignedInUser)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const hendelInput = (e) => {
        // console.log(e.target.name, e.target.value)
        let isFormValid = true;
        if (e.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);


        }
        if (e.target.name === 'password') {
            const passwordVaidat = e.target.value.length > 6;
            const passHasNumber = /\d{1}/.test(e.target.value);
            isFormValid = passwordVaidat && passHasNumber;

        }
        // isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
        if (isFormValid) {
            const newUserInfo = { ...user }
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }


    const hendelSubmit = (e) => {
        console.log(user.email, user.password)
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = "";
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updatName(user.name);
                })
                .catch((error) => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message
                    newUserInfo.success = false
                    setUser(newUserInfo);
                });

        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = ""
                    newUserInfo.success = true
                    setUser(newUserInfo)
                    setLoggedInUser(newUserInfo)
                    history.replace(from);
                    console.log('sign in user info', res.user)
                })
                .catch((error) => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message
                    newUserInfo.success = false
                    setUser(newUserInfo);
                });
        }
        e.preventDefault();
    }
    const updatName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,

        }).then(function () {
            console.log('User name update successfully')
        }).catch(function (error) {
            console.log(error)
        });
    }
    return (

        <div>
            <div className="body-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card card-signin my-5">
                                <div className="card-body">
                                    <h5 className="card-title text-center">Sign In</h5>
                                    <form className="form-signin" onSubmit={hendelSubmit}>

                                        <div className="form-group">
                                            {newUser && <input type="text" onBlur={hendelInput} name="name" className="form-control" placeholder="user Name" />}

                                        </div>

                                        <div className="form-group">
                                            <input type="email" onBlur={hendelInput} name="email" className="form-control" placeholder="Email address" required />

                                        </div>

                                        <div className="form-group">
                                            <input type="password" name="password" onBlur={hendelInput} className="form-control" placeholder="Password" required />
                                        </div>

                                        <div className="custom-control custom-checkbox mb-3">
                                            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" className="custom-control-input" id="customCheck1" />
                                            <label className="custom-control-label" for="customCheck1">Create New Account</label>
                                        </div>


                                        <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>

                                        <hr className="my-4" />
                                        <button className="btn btn-lg btn-google btn-block text-uppercase" type="submit" onClick={hendelSineIn}> Sign in with Google</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default Login;
