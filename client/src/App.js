import React, { useEffect } from "react";
import LoadEthereum from "./components/LoadEthereum";
import { useState } from "react";
import { getNumberOfPatients, updatePatient } from "./ContractConnect";
import "./css/App.css";
import PatientsList from "./components/PatientsList";
import { AddPatient } from "./components/AddPatient";
import { Button } from "primereact/button";

function App() {

  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [value, setValue] = useState(null);
  const [addPat, setAddPat] = useState(false);

  /*This is an example of how to use the contract when it is loaded*/
  useEffect(() => {
    if (contract != null) {
      /*Example of how to get the number of patients*/
      getNumberOfPatients(contract).then(result => {
        setValue(result);
      })

      /*Example of how to get all patients
      getAllPatients(contract).then(result => {
        console.log(result);
      })

      Example of how to register a patient
      let patient = ["22345782B", "Enrique Aparicio", "Calle Villanueva",544234761, "enrique@gmail.es", 35, "M", "0-", "No procede"];
      registerPatient(contract, account, patient)  

      Example of how to delete a patient
      deletePatient(contract, account, 0)
      */
    }
  }, [contract]);

  const editPatient = () => {
    let patientEdited = [1, "22345782B", "Javier Martinez", "Calle Villanueva", 544234761, "enrique@gmail.es", 35, "M", "0-", "No procede"];
    updatePatient(contract, account, patientEdited)
  }

  return (
    <>
      <span id="patients">Número de pacientes: {value ? value : 0}</span>
      <LoadEthereum
        setAccount={setAccount}
        setContract={setContract}
        account={account}
        contract={contract}
      />
      <AddPatient contract={contract} account={account} addPat={addPat} setAddPat={setAddPat}></AddPatient>
      <PatientsList contract={contract} account={account} addPat={addPat}></PatientsList>
      <Button onClick={() => editPatient()}>Editar</Button>
    </>
  )
}

export default App;
