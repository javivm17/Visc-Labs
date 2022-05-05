import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Column } from "primereact/column";
import React, { useEffect, useState } from "react";
import { getAllPatients, deletePatient } from "../ContractConnect";
import logo from "../images/logo.png";

export default function PatientsList({ contract, account }) {
    const [patients, setPatients] = useState([]);
    const [patientDialog, setPatientDialog] = useState(false);
    const [patient, setPatient] = useState({});
    const [deletePat, setDeletePat] = useState(false);

    useEffect(() => {
        if (contract != null) {
            getAllPatients(contract).then(result => {
                setPatients(result);
            }
            )
        }
    }, [contract, deletePat]);

    const patientDetails = (patient) => {
        setPatientDialog(true);
        setPatient(patient);
    }

    const deletePatientAction = (patient) => {
        deletePatient(contract, account, patient.id).then(() => setDeletePat(!deletePat));
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-external-link" className="p-button-rounded p-button-success mr-2" onClick={() => patientDetails(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => deletePatientAction(rowData)} />
            </React.Fragment>
        );
    }

    return (
        <>
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
        </>
    )
}
