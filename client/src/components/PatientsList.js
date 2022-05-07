import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Column } from "primereact/column";
import React, { useEffect, useState, useRef } from "react";
import { getAllPatients, deletePatient, updatePatient } from "../ContractConnect";
import logo from "../images/logo.png";
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';


export default function PatientsList({ contract, account, addPat, setPatientNumber }) {
    const [patients, setPatients] = useState([]);
    const [patientDialog, setPatientDialog] = useState(false);
    const [patient, setPatient] = useState({});
    const [deletePat, setDeletePat] = useState(false);
    const [editDialog, setEditDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [updatePat, setUpdatePat] = useState(false);
    const toast = useRef(null);

    useEffect(() => {
        if (contract != null) {
            getAllPatients(contract).then(result => {
                setPatients(result);
                setPatientNumber(result.length);
            }
            )
        }
        // eslint-disable-next-line
    }, [contract, deletePat, addPat, updatePat]);

    const patientDetails = (patient) => {
        setPatientDialog(true);
        setPatient(patient);
    }

    const deletePatientAction = (patient) => {
        deletePatient(contract, account, patient.id).then(() => setDeletePat(!deletePat));
    }

    const editPatientAction = (patient) => {
        setEditDialog(true);
        setPatient(patient);
    }

    const actionBodyTemplate = (rowData) => {
        return (   
            <React.Fragment>
                <Button icon="pi pi-external-link" className="p-button-rounded p-button-success mr-2" onClick={() => patientDetails(rowData)} />
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-info mr-2" onClick={() => editPatientAction(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => deletePatientAction(rowData)} />
            </React.Fragment>
        );
    }

    const edit = () => {
        setSubmitted(true);
        var result = [];
        
        for (let key in patient) {
            if (isNaN(key)) {
                result.push(patient[key]);
            }
        }

        result.splice(10, 11);
    
        updatePatient(contract, account, result).then(() => {
            setEditDialog(false);
            toast.current.show({ severity: 'success', summary: 'Edición exitosa', detail: 'Paciente existente ha sido editado', life: 3000 });
            setUpdatePat(!updatePat);
        }).catch(err => console.error(err));

    }

    const patientDialogFooter = (
        <>
            <Button label="Editar" icon="pi pi-check" className="p-button-text" onClick={edit} />
        </>
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

            <DataTable
                size="small"
                paginator
                rows={5}
                value={patients}
                header="Pacientes"
                footer={<img alt="" height="40" src={logo}></img>}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            >
                <Column
                    align="center"
                    sortable
                    filter
                    filterPlaceholder="DNI"
                    field="nif"
                    header="DNI"
                ></Column>
                <Column
                    align="center"
                    sortable
                    filter
                    filterPlaceholder="Nombre"
                    field="fullname"
                    header="Nombre"
                ></Column>
                <Column
                    align="center"
                    sortable
                    filter
                    filterPlaceholder="Teléfono"
                    field="phone"
                    header="Teléfono"
                ></Column>
                <Column
                    align="center"
                    sortable
                    filter
                    filterPlaceholder="Edad"
                    field="age"
                    header="Edad"
                ></Column>
                <Column
                    align="center"
                    sortable
                    filter
                    filterPlaceholder="Género"
                    field="genre"
                    header="Género"
                ></Column>
                <Column
                    align="center"
                    sortable
                    filter
                    filterPlaceholder="Grupo sanguíneo"
                    field="bloodGroup"
                    header="Grupo sanguíneo"
                ></Column>
                <Column align="center" body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }}></Column>
            </DataTable>
            <Dialog visible={patientDialog} style={{ width: '650px' }} header="Detalles del paciente" modal className="p-fluid" onHide={() => setPatientDialog(false)}>
                <p>
                    <strong>DNI: </strong> {patient.nif}
                </p>
                <p>
                    <strong>Nombre: </strong> {patient.fullname}
                </p>
                <p>
                    <strong>Dirección: </strong> {patient.patientAddress}
                </p>
                <p>
                    <strong>Teléfono: </strong> {patient.phone}
                </p>
                <p>
                    <strong>Email: </strong> {patient.email}
                </p>
                <p>
                    <strong>Edad: </strong> {patient.age}
                </p>
                <p>
                    <strong>Género: </strong> {patient.genre}
                </p>
                <p>
                    <strong>Grupo sanguíneo: </strong> {patient.bloodGroup}
                </p>
                <p>
                    <strong>Alergias: </strong> {patient.alergias}
                </p>
            </Dialog>

            <Dialog visible={editDialog} style={{ width: '650px' }} header="Añadir paciente" modal className="p-fluid" onHide={() => setEditDialog(false)} footer={patientDialogFooter}>
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
