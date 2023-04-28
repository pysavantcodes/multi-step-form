import React, { useState } from "react";
import { BsTelephone, BsMap } from "react-icons/bs";
import { useFormData } from "@/context/FormDataContext";

const FormPage2 = ({ next, previous }) => {
  const { phone, country, setPhone, setCountry } = useFormData();
  const [error, setError] = useState({
    phone: { visible: false, errName: "" },
  });
  
  const nextStep = (e) => {
    e.preventDefault();
    if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})\d$/
    .test(phone)) {
      setError({
        ...error,
        phone: { visible: true, errName: "Invalid Phone Number" },
      });
      setTimeout(() => {
        setError({
          ...error,
          phone: { visible: false, errName: "" },
        });
      }, 5000);
    }else{
      next()
    }
  };
  const previousStep = (e) => {
    e.preventDefault();
    previous();
  };
  return (
    <form className="form">
      <section>
        <label htmlFor="country">Nationality</label>
        <div>
          <BsMap color="#A0A3BD" size={23} />
          <input
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            required
            id="country"
            type="text"
            placeholder="Country"
          />
        </div>
      </section>
      <section>
        <label htmlFor="number">Phone Number</label>
        <div>
          <BsTelephone color="#A0A3BD" size={23} />
          <input
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            required
            id="number"
            type="tel"
            placeholder="08012345678"
          />
        </div>
        {error.phone.visible && (
          <p className="error">{error.phone.errName}</p>
        )}
      </section>
      <div className="buttons">
        <button className="previous" onClick={(e) => previousStep(e)}>
          &#8592; Previous
        </button>
        <button disabled={country == "" || phone == "" ? true : false} onClick={(e) => nextStep(e)}>Next &#8594;</button>
      </div>
    </form>
  );
};

export default FormPage2;
