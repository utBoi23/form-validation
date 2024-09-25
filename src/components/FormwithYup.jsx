import React, { useState } from 'react';
import * as yup from 'yup'
function FormwithYup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    ConfirmPassword: "",
    age: "",
    gender: "",
    interest: [],
    birthdate: "",


})
const [error,setError]= useState({});

 

  

    const validationschema = yup.object({
        firstName:yup.string().required('First name is required'),
        lastName:yup.string().required('last name is required'),
        email:yup.string().required("email is required").email("invalid email"),
        password: yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one symbol"
      )
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
    confirmPassword: yup.string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),

      age:yup.number().required("age is required") . min(18,"age must be 18") .max(100, "age less then 100"),
      gender: yup.string().required("Gender is required"),

      interests: yup.array()
      .min(1, "Select at least one interest")
      .required("Select at least one interest"),
    birthDate: yup.date().required("Date of birth is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await validationschema.validate(formData , {abortEarly:false})
        console.log("form Subbmitted" , formData)
    } catch (error) {
   
        const newErrors = {};

        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });

        setError(newErrors);

    }
    
  }


  const handleChange =(e) =>{
    const {name,value} = e.target;

    setFormData({...formData,[name]:value})
  }

  const handleCheckboxChange = (e) => {
    const{name,checked} = e.target
    let updatedInterest= [...formData.interest]
    if (checked){
updatedInterest.push(name)
    }
    else{
      updatedInterest=updatedInterest .filter(
(interest) => interest !== name)
    }

    setFormData({
      ...formData, interest:updatedInterest,
    })
  }
  return (
    <>
      <form className = 'form'onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type='text'
            name='firstName'
            value={formData.firstName}
            placeholder='Enter Your name Here'
            onChange={handleChange}
          />
           {error.firstName && <div className="error">{error.firstName}</div>}
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type='text'
            name='lastName'
            value={formData.lastName}
            placeholder='Enter Your name Here'
            onChange={handleChange}

          />
           {error.lastName && <div className="error">{error.lastName}</div>}
        </div>

        <div>
          <label>Email</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            placeholder='Enter Your Email'
            onChange={handleChange}
            

          />
           {error.email && <div className="error">{error.email}</div>}
        </div>

        <div>
          <label>Password</label>
          <input
            type='password'
            name='password'
            value={formData.password}
            placeholder='Enter Your Password'
            onChange={handleChange}
          
          />
           {error.password && <div className="error">{error.password}</div>}

        </div>

        <div>
          <label>Confirm Password</label>
          <input
            type='password'
            name='ConfirmPassword'
            value={formData.ConfirmPassword}
            placeholder='Confirm Your Password'
            onChange={handleChange}

          />
           {error.ConfirmPassword && <div className="error">{error.ConfirmPassword}</div>}

        </div>

        <div>
          <label>Age</label>
          <input
            type='number'
            name='age'
            value={formData.age}
            placeholder='age'
            onChange={handleChange}

          />
           {error.age && <div className="error">{error.age}</div>}

        </div>

        <div>
          <label> Gender: </label>
          
          <select name='gender' value={formData.gender} 
            onChange={handleChange}
          
          >
            <option value='male'>Male</option>
            <option value='female'>female</option>
            <option value='other'>other</option>
          </select>
        </div>

        <div>
          <label>Interest :</label>
          <label>
            <input
              type='checkbox'
              name='coding'
              value={formData.interest.includes('coding')}
              onChange={handleCheckboxChange}
            />
            Coding
          </label>

          <label>
            <input
              type='checkbox'
              name='playing'
              value={formData.interest.includes('playing')}
              onChange={handleCheckboxChange}

            />
            Playing
          </label>

          <label>
            <input
              type='checkbox'
              name='reading'
              value={formData.interest.includes('reading')}
              onChange={handleCheckboxChange}

            />
            Reading
          </label>
        </div>
        <button className='btn' type='submit'> Submit </button>
      </form>
    </>
  )
}

export default FormwithYup;