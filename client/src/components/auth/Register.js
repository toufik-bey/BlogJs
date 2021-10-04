import React from 'react'
import { useState } from 'react';
import { Fragment } from 'react';
import axios from 'axios'; 

export const Register = () => {
    const [formaData , setFromData] =  useState({
        name:'', 
        email:'',
        password:'',
        password2:''
    });

    const {name,email,password,password2} =formaData; 

    const onChange = (e)=>{setFromData({...formaData ,[e.target.name]:e.target.value})}; 

    const onSubmit = async(e)=>{
        e.preventDefault(); 
        if(password !== password2){
            console.log('possowrd incorect')
        } else{
            const newUser = {
                name,
                email,
                password
            }
            const config = {
                headers:{
                    'Content-type':'application/json'
                }
            }; 
            
            const body = JSON.stringify(newUser); 
            try {
  
                const res = await axios.post('http://localhost:5000/api/users', body , config); 
                console.log(res.data); 
            } catch (error) {
                console.error(error.message)
            }
        }
        
         
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <input 
            type="text"
            placeholder="Name"
            name='name'
            value={name}
            onChange={e=>onChange(e)}
            required />
        </div>

        <div className="form-group">
          <input type="email" 
          placeholder="Email Address"
           name="email" 
           value={email}
           onChange={e=>onChange(e)}
           required/>
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small>
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e=>onChange(e)}
          />
        </div>
        
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={e=>onChange(e)}
          />

        </div>
        <input type="submit"
         className="btn btn-primary"
          value="Register"
          
           />
      </form>
      <p className="my-1">
        Already have an account? <a href="login.html">Sign In</a>
      </p>
        </Fragment>
    )
}
