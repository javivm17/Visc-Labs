import React  from "react";
import LoadEthereum from "./components/LoadEthereum";
import { useState } from "react";
import "./css/App.css";
import PatientsList from "./components/PatientsList";
import { AddPatient } from "./components/AddPatient";

function App() {

  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [patientNumber, setPatientNumber] = useState(0);
  const [addPat, setAddPat] = useState(false);

  return (
    <>
      <div className="h-2rem w-full patient-number">
        <p>Se han registrado un total de {patientNumber ? patientNumber : 0} paciente/s</p>
      </div>
      <LoadEthereum
        setAccount={setAccount}
        setContract={setContract}
        account={account}
        contract={contract}
      />
      <AddPatient contract={contract} account={account} addPat={addPat} setAddPat={setAddPat}></AddPatient>
      <PatientsList contract={contract} account={account} addPat={addPat} setPatientNumber={setPatientNumber}></PatientsList>
    </>
  )
}

export default App;
