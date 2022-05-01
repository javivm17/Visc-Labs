import React from "react";
import Web3 from "web3";
import SimpleStorage from "../contracts/SimpleStorage.json";

const LoadEthereum = ({setAccount,account, setContract, contract, }) => {

    const loadEthereum = async () => {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0])
     
            /*This is for loading the contract*/
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = SimpleStorage.networks[networkId];
            const instance = new web3.eth.Contract(
                SimpleStorage.abi,
                deployedNetwork && deployedNetwork.address,
              );
            setContract(instance)
        }
        else {
            window.alert("Please install MetaMask!");
        }
            
    }

    return(
        <div>
            <button onClick={() => loadEthereum()}>{account ? account.slice(0,6)+"..."+account.slice(37,43) : "Load Metamask"}</button>
        </div>
    )
}

export default LoadEthereum;