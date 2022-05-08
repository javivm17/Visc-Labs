
import React, { useState, useRef } from 'react';
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import "../css/AddPatient.css";
import { registerPatient } from "../ContractConnect";
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';

export const AddPatient = ({ contract, account, addPat, setAddPat }) => {
    let emptyPatient = {
        nif: "",
        fullname: "",
        patientAddress: "",
        phone: "",
        email: "",
        age: "",
        genre: "",
        bloodGroup: "",
        alergias: ""
    };

    const [addDialog, setAddDialog] = useState(false);
    const [patient, setPatient] = useState(emptyPatient);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);

    const register = () => {
        setSubmitted(true);
        var result = [];
        for (let key in patient) {
            result.push(patient[key]);
        }
        registerPatient(contract, account, result).then(() => {
            setAddDialog(false);
            toast.current.show({ severity: 'success', summary: 'Creación exitosa', detail: 'Nuevo paciente añadido', life: 3000 });
            setAddPat(!addPat)
        }).catch(err => console.error(err));
    }

    const patientDialogFooter = (
        <React.Fragment>
            <Button label="Crear" icon="pi pi-check" className="p-button-text" onClick={register} />
        </React.Fragment>
    );

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _patient = { ...patient };
        _patient[`${name}`] = val;

        setPatient(_patient);
    }

    return (
        <>
            <Toast ref={toast} />
            <Button icon="pi pi-plus" id="add-button" className="mt-5 p-button-rounded" onClick={() => { setAddDialog(true); setSubmitted(false) }} />
            <Dialog visible={addDialog} style={{ width: '650px' }} header="Añadir paciente" modal className="p-fluid" onHide={() => setAddDialog(false)} footer={patientDialogFooter}>
                <div className="field">
                    <label htmlFor="nif">DNI</label>
                    <InputText type="text" id="nif" value={patient.nif} onChange={(e) => onInputChange(e, 'nif')} />
                </div>
                <div className="field">
                    <label htmlFor="fullname">Nombre</label>
                    <InputText type="text" id="fullname" value={patient.fullname} onChange={(e) => onInputChange(e, 'fullname')} />
                </div>
                <div className="field">
                    <label htmlFor="patientAddress">Dirección</label>
                    <InputText type="text" id="patientAddress" value={patient.patientAddress} onChange={(e) => onInputChange(e, 'patientAddress')} />
                </div>
                <div className="field">
                    <label htmlFor="phone">Teléfono</label>
                    <InputText type="number" id="phone" value={patient.phone} onChange={(e) => onInputChange(e, 'phone')} required className={classNames({ 'p-invalid': submitted && !patient.phone })} />
                    {submitted && !patient.phone && <small className="p-error">El teléfono es requerido.</small>}
                </div>
                <div className="field">
                    <label htmlFor="email">Email</label>
                    <InputText type="email" id="email" value={patient.email} onChange={(e) => onInputChange(e, 'email')} />
                </div>
                <div className="field">
                    <label htmlFor="age">Edad</label>
                    <InputText type="number" id="age" value={patient.age} onChange={(e) => onInputChange(e, 'age')} required className={classNames({ 'p-invalid': submitted && !patient.age })} />
                    {submitted && !patient.age && <small className="p-error">La edad es requerida.</small>}
                </div>
                <div className="field">
                    <label htmlFor="genre">Género</label>
                    <InputText type="text" id="genre" value={patient.genre} onChange={(e) => onInputChange(e, 'genre')} />
                </div>
                <div className="field">
                    <label htmlFor="bloodGroup">Grupo sanguíneo</label>
                    <InputText type="text" id="bloodGroup" value={patient.bloodGroup} onChange={(e) => onInputChange(e, 'bloodGroup')} />
                </div>
                <div className="field">
                    <label htmlFor="alergias">Alergias</label>
                    <InputText type="text" id="alergias" value={patient.alergias} onChange={(e) => onInputChange(e, 'alergias')} />
                </div>
            </Dialog>
        </>
    )
}
