
import React, { useRef } from 'react';
import { SpeedDial } from 'primereact/speeddial';
import { Toast } from 'primereact/toast';
import "../css/Actions.css";

export const Actions = () => {

    const toast = useRef(null);

    const items = [
        {
            label: 'Add',
            icon: 'pi pi-pencil',
            command: () => {
                toast.current.show({ severity: 'info', summary: 'Add', detail: 'Data Added' });
            }
        },
        {
            label: 'Update',
            icon: 'pi pi-refresh',
            command: () => {
                toast.current.show({ severity: 'success', summary: 'Update', detail: 'Data Updated' });
            }
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => {
                toast.current.show({ severity: 'error', summary: 'Delete', detail: 'Data Deleted' });
            }
        },
        {
            label: 'Upload',
            icon: 'pi pi-upload',
            command: () => {
                window.location.hash = "/fileupload"
            }
        },
        {
            label: 'React Website',
            icon: 'pi pi-external-link',
            command: () => {
                window.location.href = 'https://facebook.github.io/react/'
            }
        }
    ];

    return (
        <>
            <Toast ref={toast} />
            <SpeedDial id="actions" model={items} direction="left" />
        </>
    )
}
