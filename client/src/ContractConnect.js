export async function getNumberOfPatients(contract) {
    return await contract.methods.patientCounter().call();
}

export async function getPatient(contract, index) {
    return await contract.methods.patients(index).call();
}

export async function getAllPatients(contract) {
    let patients = [];
    const numberOfPatients = await getNumberOfPatients(contract);
    for (let i = 0; i < numberOfPatients; i++) {
        let patient = await getPatient(contract, i);

        /*If registeredBy is equal to 0x0000000000000000000000000000000000000000 it means that it has been deleted*/
        if (patient.registeredBy !== "0x0000000000000000000000000000000000000000") {
            patients.push(patient);
        }
    }
    return patients;
}

export async function registerPatient(contract, account, patient) {
    await contract.methods.registerPatient(...patient).send({ from: account })
}

export async function deletePatient(contract, account, id) {
    await contract.methods.deletePatient(id).send({ from: account })
}