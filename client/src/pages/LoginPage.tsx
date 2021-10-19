import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Google } from '../components/Google/GoogleLogin';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';

import "../css/loginPage.css"

export const LoginPage = () => {

    const { login, googleLogin } = useContext(AuthContext);

     const [form, setForm ] = useState({
         email: "",
         password: "",
         rememberme: false
     });


    useEffect(() => {

        const email = localStorage.getItem("email");

        if(email)
            setForm( form => ({
                ...form,
                email,
                rememberme: true
               
            }))
        
    }, [])


    const onChange = ({target} : {target:any}) => {
        
        const { name, value } = target;

        setForm({
            ...form,
            [name]: value
        });
    
    }
    
    const toggleCheck = () => {
        setForm({
            ...form,
            rememberme: !form.rememberme
        });
    }

    const onSubmit =  async (e: React.FormEvent<HTMLFormElement>)  => {
        e.preventDefault();

        // If remember option is checked, save email on localstorage. Otherwise, remove it.
        form.rememberme
        ? localStorage.setItem("email", form.email)
        : localStorage.removeItem("email");


        const { email, password } = form;
        const ok = await login( email, password );
    
        if (!ok) return Swal.fire("Error", "Check your credentials", "error");

    }

    const allOk = () => {
        return ( form.email.length > 0 && form.password.length > 0 ) ? true : false;
    }


    return (
      <form
        className="login100-form validate-form flex-sb flex-w"
        onSubmit={onSubmit}
      >
        <span className="login100-form-title mb-3">Login</span>

        <div className="wrap-input100 validate-input mb-3">
          <input
            className="input100"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
          />
          <span className="focus-input100"></span>
        </div>

        <div className="wrap-input100 validate-input mb-3">
          <input
            className="input100"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
          />
          <span className="focus-input100"></span>
        </div>

        <div className="row mb-3">
          <div className="col" onClick={() => toggleCheck()}>
            <input
              className="input-checkbox100"
              id="ckb1"
              type="checkbox"
              name="rememberme"
              readOnly
              checked={form.rememberme}
            />
            <label className="label-checkbox100">&nbsp;Remember</label>
          </div>

          <div className="col text-center">
            <Link to="/auth/register" className="txt1">
              Sign up? 
            </Link>
          </div>
        </div>

        <div className="container-login100-form-btn m-t-17">
          <button
            type="submit"
            className="login100-form-btn"
            disabled={!allOk()}
          >
            Sign in
          </button>
        </div>
        <Google informParent={googleLogin} />
      </form>
    );
}