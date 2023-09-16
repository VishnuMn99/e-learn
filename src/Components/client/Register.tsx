import React, { useState } from 'react'
import './Register.css'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import userAxios from '../../Axios/userAxios'
import { ToastContainer,toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"




type initialValuesType = {
    name: string
    email: string
    phone: number | undefined
    password: string
}


const UserRegister: React.FC = () => {

    const [respSuccess,setResSuccess] = useState<string | undefined>(undefined)
    const [resError, setResError] = useState<string | undefined>(undefined)
    


    const initialValues: initialValuesType = {
        name: '',
        email: '',
        phone: undefined,
        password: '',
    }

    const validationSchema = Yup.object({
        name: Yup.string().min(3, 'name must be least 3 characters').required('please enter your name'),
        email: Yup.string().email('Invalid format').required('please enter your email '),
        phone: Yup.string().matches(/^\d{10}$/, 'Phone number must be exactly 10 digit').required('Please enter your mobile number'),
        password: Yup.string().min(6, 'password must be at least 6 digit')
            .matches(/^[a-zA-Z0-9]*$/, 'Password can only contain numbers and letters')
            .required('Please enter you password')

    })

    const onSubmit = (values: initialValuesType) => {

        console.log(values.name, values.email);
        console.log('hi');
        
        userAxios.post('/signup', { name: values.name, email: values.email, phone: values.phone, password: values.password }).then((res)=>{
            
            console.log("submit", res.data.message);
            setResSuccess(res.data.message)
            setResError(undefined)
            toast.success('🦄 User signup successfull please verify your mail', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });

        }).catch((err:any)=>{
            console.log(err?.resposnse?.data?.message);
            
            setResError(err?.respnse?.data?.message)
            setResSuccess(undefined)
            toast.error('🦄 User Already exist!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        })
          
   
    }

   

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
           <div className='h-screen w-fulltop-0 flex items-center justify-center' >
            <section className="signUp "  >
                <div className="container_login ">
                    <div className="signUp-content  ">
                        <div className="signUp-form ">
                            <h2 className="form-title text-lavender">Sign up</h2>
                            <Form method="POST" className="register-form" id="register-form">
                                <div className="form-group">
                                    <label htmlFor="name">
                                        <i className="zmdi zmdi-account material-icons-name"></i>
                                    </label>
                                    <Field
                                        type="text"
                                        name="name"
                                        id="name"

                                        placeholder="Your Name"
                                    />
                                    <ErrorMessage  name='name'>
                                               {
                                                (errorMsg)=><div className='error text-red'>{errorMsg}</div>
                                               }              
                                    </ErrorMessage>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">
                                        <i className="zmdi zmdi-email"></i>
                                    </label>
                                    <Field
                                        type="email"
                                        name="email"
                                        id="email"

                                        placeholder="Your Email"
                                    />
                                    <ErrorMessage name='email'>
                                       {
                                        (errorMsg)=> <div className='error text-red'>{errorMsg}</div>
                                       }    
                                    </ErrorMessage>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pass">
                                        <i className="fa-sharp fa-solid fa-address-book"></i>
                                    </label>
                                    <Field
                                        type="tel"
                                        name="phone"
                                        id="phone"

                                        placeholder="Your Dial number"
                                    />
                                    <ErrorMessage name='phone'>
                                       {
                                        (errorMsg)=> <div className='error text-red'>{errorMsg}</div>
                                       }    
                                    </ErrorMessage>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="re-pass">
                                        <i className="zmdi zmdi-lock-outline"></i>
                                    </label>
                                    <Field
                                        type="password"
                                        name="password"
                                        id="password"

                                        placeholder="Enter your Password"
                                    />
                                    <ErrorMessage name='password'>
                                       {
                                        (errorMsg)=> <div className='error text-red'>{errorMsg}</div>
                                       }    
                                    </ErrorMessage>
                                </div>
                                
                                <div className="form-group form-button">
                                <button
                                 type="submit"
                                className="w-full text-white bg-lavender hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                  >
                                Sign Up
                               </button>
                                </div>
                            </Form>

                        </div>
                        <div className="signUp-image">
                            <figure>
                                <img src='https://i.pinimg.com/564x/0d/30/9b/0d309bbc802545f9ef289357a3179b89.jpg' alt="sing up image" />
                            </figure>
                             <ToastContainer/>
                        </div>
                    </div>
                </div>
                
            </section>
            {resError && <p className="fonts text-green text-lg">{resError}</p>}
            </div>
           

        </Formik>





    )

}

export default UserRegister

