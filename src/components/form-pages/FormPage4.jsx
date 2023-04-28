import React, { useEffect, useRef, useState } from "react";
import { useFormData } from "@/context/FormDataContext";
import lottie from "lottie-web";

const FormPage4 = ({ previous }) => {
  const { name, email, country, phone } = useFormData();
  const [submitted, setSubmitted] = useState(false);
  const previousStep = (e) => {
    e.preventDefault();
    previous();
  };
  const nextStep = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  const container = useRef(null);
  

  return (
    <form className="form">
      {submitted ? (
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div className="container">
            <img style={{width:"100%", height:"100%"}} src="https://user-images.githubusercontent.com/110984357/235051573-40434084-682b-4dd2-9e60-c3007613a15c.gif"/>
          </div>
          <h1>Your form has been submitted!!!</h1>
        </section>
      ) : (
        <>
          <section
            style={{ display: "flex", flexDirection: "column", rowGap: "15px" }}
          >
            <h3>
              Name: <span style={{ fontWeight: 300 }}>{name}</span>
            </h3>
            <h3>
              Email: <span style={{ fontWeight: 300 }}>{email}</span>
            </h3>
            <h3>
              Country: <span style={{ fontWeight: 300 }}>{country}</span>
            </h3>
            <h3>
              Phone: <span style={{ fontWeight: 300 }}>{phone}</span>
            </h3>
          </section>

          <div className="buttons">
            <button className="previous" onClick={(e) => previousStep(e)}>
              &#8592; Previous
            </button>
            <button onClick={(e) => nextStep(e)}>Submit &#8594;</button>
          </div>
        </>
      )}
    </form>
  );
};

export default FormPage4;
