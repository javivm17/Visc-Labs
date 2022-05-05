import React from "react";
import Web3 from "web3";
import MedicalReport from "../contracts/MedicalReport.json";
import { Button } from 'primereact/button';
import "../css/LoadEthereum.css";

const LoadEthereum = ({ setAccount, account, setContract, contract }) => {

    const loadEthereum = async () => {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
            const accounts = await web3.eth.getAccounts();
            setAccount(accounts[0])

            /*This is for loading the contract*/
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = MedicalReport.networks[networkId];
            const instance = new web3.eth.Contract(
                MedicalReport.abi,
                deployedNetwork && deployedNetwork.address,
            );
            setContract(instance)
        }
        else {
            window.alert("Please install MetaMask!");
        }

    }

    return (
        <Button id="button-c" className="p-button-rounded" onClick={() => loadEthereum()}>{account ? account.slice(0, 6) + "..." + account.slice(37, 43) : "Conectar"}</Button>
    )
}

export default LoadEthereum;