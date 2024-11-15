import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function UserItem({ user, totalCount }) {
    // Define columns for the DataGrid
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'personName', headerName: 'Name', width: 250 },
        { field: 'personEmail', headerName: 'Email', width: 250 },
        { field: 'personPhoneNumber', headerName: 'Phone Number', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <div>
                    <button onClick={() => handleDelete(params.row.personId)}>Delete</button>
                    <button onClick={() => handleUpdate(params.row)}>Edit</button>
                </div>
            ),
        },
    ];

    // Map over the users to create rows
    const rows = user.map((user, index) => ({
        id: index + 1,
        personName: user.personName,
        personEmail: user.personEmail,
        personPhoneNumber: user.personPhoneNumber,
        personId: user.personId,
    }));

    const handleDelete = async (personId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`https://fusiontech-q0v4.onrender.com/api/v1/SystemAdmin?personId=${personId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(`Deleted user with ID: ${personId}`);
            Swal.fire({
                text: "user has been deleted",
                icon: "success",
                showConfirmButton: true,
                customClass: {
                    popup: 'neon-popup',
                    title: 'neon-title',
                    content: 'neon-content',
                    icon: 'neon-icon'
                },
            }).then(() => {

                window.location.reload();
            });

        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };


    const handleUpdate = (user) => {
        // Handle the update of the user, e.g., open a modal or navigate
        console.log(`Updating user: ${user.personName}`);
    };

    return (
        <div style={{ height: 600, width: '100%', marginBottom: '30px' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}  // Display 5 rows per page
                rowsPerPageOptions={[5]}
                checkboxSelection
                pagination
                rowCount={totalCount} // Total count for pagination
                paginationMode="server" // Server-side pagination
                sx={{
                    border: '2px solid #00FF00',  // Neon green border
                    color: '#FFF',                // White font color for the grid text
                    '.MuiDataGrid-columnHeader': {
                        backgroundColor: '#121212', // Dark background for column headers
                        color: '#00FF00',            // Neon green header text
                        fontWeight: 'bold',
                        fontSize: '16px',            // Increase font size for better readability
                    },
                    '.MuiDataGrid-cell': {
                        backgroundColor: '#1a1a1a', // Dark cell background
                        color: '#FFF',                // White text for cell content
                        '&:hover': {
                            backgroundColor: '#333', // Highlight cells on hover
                        },
                    },
                    '.MuiDataGrid-footerContainer': {
                        backgroundColor: '#121212', // Dark footer
                        color: '#00FF00',            // Neon green footer text
                    },
                    '.MuiPaginationItem-root': {
                        color: '#00FF00',            // Neon green pagination buttons
                    },
                    '.MuiCheckbox-root': {
                        color: '#FFF',               // Make checkboxes white
                        '&.Mui-checked': {
                            color: '#00FF00',          // Neon green when checked
                        },
                    },
                    // Style the action buttons in the grid
                    '.MuiDataGrid-cell button': {
                        backgroundColor: '#00FF00', // Neon green button background
                        border: 'none',
                        padding: '5px 10px',
                        margin: '0 5px',
                        color: '#121212',           // Text color for the button
                        cursor: 'pointer',
                        borderRadius: '5px',
                        transition: 'background-color 0.3s ease',
                    },
                    '.MuiDataGrid-cell button:hover': {
                        backgroundColor: '#009900',  // Darker green on hover for action buttons
                    },
                }}
            />
        </div>
    );
}
