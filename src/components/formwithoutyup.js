import React, { useState } from 'react';

function Formwithoutyup() {
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

  const [errors, setErrors] = useState();

  const isValidEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  // const isValidPhoneNumber = (phoneNumber) => {
  //   // Regular expression for basic phone number validation (10 digits)
  //   const phoneRegex = /^\d{10}$/;
  //   return phoneRegex.test(phoneNumber);
  // };

  const isValidPassword = (password) => {
    // Regular expressions for password validation
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /[0-9]/;
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    return (
      password.length >= 8 &&
      symbolRegex.test(password) &&
      numberRegex.test(password) &&
      upperCaseRegex.test(password) &&
      lowerCaseRegex.test(password)
    );
  };

  const isValidAge = (age) => {
    return parseInt(age) >= 18 && parseInt(age) <= 100;
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    // if (!formData.phoneNumber) {
    //   newErrors.phoneNumber = "Phone number is required";
    // } else if (!isValidPhoneNumber(formData.phoneNumber)) {
    //   newErrors.phoneNumber = "Phone number must be 10 digits";
    // }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!isValidPassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long and contain at least one symbol, one number, one uppercase letter, and one lowercase letter";
    }
    if (!formData.ConfirmPassword) {
      newErrors.ConfirmPassword = "Confirm password is required";
    } else if (formData.ConfirmPassword !== formData.password) {
      newErrors.ConfirmPassword = "Passwords must match";
    }
    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (!isValidAge(formData.age)) {
      newErrors.age =
        "You must be at least 18 years old and not older than 100 years";
    }
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }
    if (formData.interest.length === 0) {
      newErrors.interest = "Select at least one interest";
    }
    if (!formData.birthdate) {
      newErrors.birthdate = "Date of birth is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  console.log(errors);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (isValid) {
      console.log("Form Submitted", formData);
    } else {
      console.log("Form Validation Failed");
    }
  }; 




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

export default Formwithoutyup;