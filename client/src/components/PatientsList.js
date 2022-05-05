import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React from "react";

export default function PatientsList() {
    return (
        <DataTable
            size="small"
            paginator
            rows={5}
            value={null}
            header="Datos de los pacientes"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        >
            <Column
                sortable
                filter
                filterPlaceholder="Id"
                field="id"
                header="Id"
            ></Column>
            <Column
                sortable
                filter
                filterPlaceholder="Nombre"
                field="name"
                header="Nombre"
            ></Column>
            <Column
                sortable
                filter
                filterPlaceholder="Edad"
                field="Edad"
                header="Edad"
            ></Column>
        </DataTable>
    )
}
