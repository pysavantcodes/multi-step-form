import { useState } from "react";
import StepIndicator from "@/components/StepIndicator";
import FormPage1 from "@/components/form-pages/FormPage1";
import FormPage2 from "@/components/form-pages/FormPage2";
import FormPage3 from "@/components/form-pages/FormPage3";
import FormPage4 from "@/components/form-pages/FormPage4";

export default function Home() {
  const [formPosition, setFormPosition] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([1]);
  return (
    <section>
      <section className="formBody">
        <div>
          <h1>Get Started with Julieth AI</h1>
          <p className="headerText">
            Please fill in the form below to continue. Valid and utmost accuracy
            is needed
          </p>
          <div className="formContainer">
            <StepIndicator completedSteps={completedSteps} />
            {formPosition == 1 && (
              <FormPage1
                next={() => {
                  setFormPosition(2);
                  completedSteps.push(2);
                }}
              />
            )}
            {formPosition == 2 && (
              <FormPage2
                next={() => {
                  setFormPosition(3);
                  completedSteps.push(3);
                }}
                previous={()=>{
                  setFormPosition(1);
                  completedSteps.splice(completedSteps.indexOf(2), 1);
                }}
              />
            )}
            {formPosition == 3 && (
              <FormPage3
                next={() => {
                  setFormPosition(4);
                  completedSteps.push(4);
                }}
                previous={()=>{
                  setFormPosition(2);
                  completedSteps.splice(completedSteps.indexOf(3), 1);
                }}
              />
            )}
            {formPosition == 4 && (
              <FormPage4
                next={() => {
                  
                }}
                previous={()=>{
                  setFormPosition(3);
                  completedSteps.splice(completedSteps.indexOf(4), 1);
                }}
              />
            )}
          </div>
        </div>
      </section>
    </section>
  );
}
