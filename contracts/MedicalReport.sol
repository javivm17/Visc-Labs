// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

contract MedicalReport {

    constructor () {
        registerPatient("77939030B", "Javier Vilarino", "Plza Virgen de la Amargura", 638824971, "jvilarinno@us.es",
            21, "M", "0+", "El paciente tiene alergia a los acaros");
        registerPatient("77939030A", "Manuel Luis", "Calle Tejares", 638824971, "jvilarinno@us.es",
            43, "M", "0+", "No procede");
    }
    
    struct Patient {
        uint id;
        string nif;
        string fullname;
        string patientAddress;
        uint phone;
        string email;
        uint age;
        string genre;
        string bloodGroup;
        string alergias;
        address registeredBy;
        uint256 registeredAt;
    }

    uint public patientCounter = 0;

    mapping(uint => Patient) public patients;

    function registerPatient(
        string memory _nif, 
        string memory _fullname,
        string memory _patientAddress,
        uint _phone,
        string memory _email,
        uint _age,
        string memory _genre,
        string memory _bloodGroup,
        string memory _alergias) public {
            patients[patientCounter] = Patient(
                patientCounter,
                _nif,
                _fullname,
                _patientAddress,
                _phone,
                _email,
                _age,
                _genre, 
                _bloodGroup,
                _alergias,
                msg.sender,
                block.timestamp
            );
            patientCounter++;
        }
    
    function deletePatient(uint _id) public {
        delete patients[_id];
    }

    function updatePatient(
        uint _id,
        string memory _nif, 
        string memory _fullname,
        string memory _patientAddress,
        uint _phone,
        string memory _email,
        uint _age,
        string memory _genre,
        string memory _bloodGroup,
        string memory _alergias) public {
            Patient storage patient = patients[_id];
            patient.nif = _nif;
            patient.fullname = _fullname;
            patient.patientAddress = _patientAddress;
            patient.phone = _phone;
            patient.email = _email;
            patient.age = _age;
            patient.genre = _genre;
            patient.bloodGroup = _bloodGroup;
            patient.alergias = _alergias;
        }

}