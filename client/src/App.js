import React, { useEffect } from "react";
import LoadEthereum from "./components/LoadEthereum";
import { useState } from "react";
import { getNumberOfPatients, getPatient, getAllPatients, registerPatient, deletePatient } from "./ContractConnect";
import "./css/App.css";
import PatientsList from "./components/PatientsList";
import { Actions } from "./components/Actions";

function App() {

  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [value, setValue] = useState(null);

  /*This is an example of how to use the contract when it is loaded*/
  useEffect(() => {
    if (contract!=null){
      /*Example of how to get the number of patients*/
      getNumberOfPatients(contract).then(result => {
        setValue(result);
      })
      
      /*Example of how to get all patients*/
      getAllPatients(contract).then(result => {
        console.log(result);
      })

      /*Example of how to register a patient*/
      let patient = ["22345782B", "Enrique Aparicio", "Calle Villanueva",544234761, "enrique@gmail.es", 35, "M", "0-", "No procede"];
      registerPatient(contract, account, patient)  

      /*Example of how to delete a patient*/
      deletePatient(contract, account, 0)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  } , [contract]);

  return (
    <>
      {value}
      <LoadEthereum
        setAccount={setAccount}
        setContract={setContract}
        account={account}
        contract={contract}
      />
      <Actions></Actions>
      <PatientsList></PatientsList>
    </>
  )
}

export default App;
