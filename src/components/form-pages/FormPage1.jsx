import React, { useState } from "react";
import styles from "@/styles/Home.module.css";
import { FaRegUser } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { useFormData } from "@/context/FormDataContext";

const FormPage1 = ({ next }) => {
  const {
    name,
    setName,
    email,
    setEmail,
  } = useFormData();
  const [error, setError] = useState({
    email: { visible: false, errName: "" },
  });

  const nextStep = (e) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError({
        ...error,
        email: { visible: true, errName: "Invalid email" },
      });
      setTimeout(() => {
        setError({
          ...error,
          email: { visible: false, errName: "" },
        });
      }, 5000);
    } else {
      next();
    }
  };

  return (
    <form className="form">
      <section>
        <label htmlFor="name">Full Name</label>
        <div>
          <FaRegUser color="#A0A3BD" size={23} />
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            id="name"
            type="text"
            placeholder="e.g: John Doe"
          />
        </div>
      </section>
      <section>
        <label htmlFor="email">Email Address</label>
        <div>
          <FiMail color="#A0A3BD" size={23} />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            id="email"
            type="email"
            placeholder="johndoe@gmail.com"
          />
        </div>
        {error.email.visible && <p className="error">{error.email.errName}</p>}
      </section>
      <button
        disabled={email == "" || name == "" ? true : false}
        onClick={(e) => nextStep(e)}
      >
        Next &#8594;
      </button>
    </form>
  );
};

export default FormPage1;
