import React, { useState } from "react";
import { BsEye, BsEyeSlash, BsLock } from "react-icons/bs";
import { useFormData } from "@/context/FormDataContext";

const FormPage3 = ({ next, previous }) => {
  const { password, confirmPassword, setPassword, setConfirmPassword } =
    useFormData();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState({
    visible: false,
    errName: "",
  });
  const [confirmPasswordError, setConfirmPasswordError] = useState({
    visible: false,
    errName: "",
  });

  const nextStep = (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setPasswordError({
        visible: true,
        errName: "Password must have at least 8 characters",
      });
      setTimeout(() => {
        setPasswordError({ visible: false, errName: "" });
      }, 5000);
    } else if (confirmPassword !== password) {
      setConfirmPasswordError({
        visible: true,
        errName: "Passwords do not match",
      });
      setTimeout(() => {
        setConfirmPasswordError({ visible: false, errName: "" });
      }, 5000);
    } else {
      next();
    }
  };
  const previousStep = (e) => {
    e.preventDefault();
    previous();
  };
  return (
    <form className="form">
      <section>
        <label htmlFor="country">Password</label>
        <div>
          <BsLock color="#A0A3BD" size={23} />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            id="password"
            type={!showPassword ? "password" : "text"}
            placeholder="**********"
          />
          {showPassword ? (
            <BsEyeSlash onClick={()=>setShowPassword(!showPassword)} color="#170f49" size={24} />
          ) : (
            <BsEye onClick={()=>setShowPassword(!showPassword)}  color="#170f49" size={24} />
          )}
        </div>
        {passwordError.visible && (
          <p className="error">{passwordError.errName}</p>
        )}
      </section>
      <section>
        <label htmlFor="confirm">Confirm Password</label>
        <div>
          <BsLock color="#A0A3BD" size={23} />
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            required
            id="confirm"
            type={!showConfirmPassword ? "password" : "text"}
            placeholder="*********"
          />
          {showConfirmPassword ? (
            <BsEyeSlash onClick={()=>setShowConfirmPassword(!showConfirmPassword)} color="#170f49" size={24} />
          ) : (
            <BsEye onClick={()=>setShowConfirmPassword(!showConfirmPassword)}  color="#170f49" size={24} />
          )}
        </div>
        {confirmPasswordError.visible && (
          <p className="error">{confirmPasswordError.errName}</p>
        )}
      </section>
      <div className="buttons">
        <button className="previous" onClick={(e) => previousStep(e)}>
          &#8592; Previous
        </button>
        <button
          disabled={password == "" || confirmPassword == "" ? true : false}
          onClick={(e) => nextStep(e)}
        >
          Next &#8594;
        </button>
      </div>
    </form>
  );
};

export default FormPage3;
