import React, { useEffect } from "react";
import LoadEthereum from "./components/LoadEthereum";
import { useState } from "react";

function App () {
  
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [value, setValue] = useState(null);

  /*This is an example of how to use the contract when it is loaded*/
  useEffect(() => {
    if (contract!=null){
      getNumber().then(res => {setValue(res)})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  } , [contract]);
  const getNumber = async () => {
    return await contract.methods.get().call();
  }

  return (
    <div className="App">
      <h1>Visc-Labs</h1>
      <LoadEthereum
        setAccount={setAccount} 
        setContract={setContract}
        account={account}
        contract={contract}
      />
      <p>The number which is almacenated is: {value}</p>
    </div>
  )
}

export default App;
