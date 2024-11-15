import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

export default function ProductItem({ product, totalCount }) {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  // Define columns for the DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'gameName', headerName: 'Game Name', width: 250 },
    { field: 'yearOfRelease', headerName: 'Year of Release', width: 150 },
    { field: 'totalRating', headerName: 'Total Rating', type: 'number', width: 150 },
    { field: 'price', headerName: 'Price', type: 'number', width: 150 },
    {
      field: 'actions', headerName: 'Actions', width: 150, renderCell: (params) => {
        return (
          <div>
            <button onClick={() => handleDelete(params.row.videoGameInfoId)}>Delete</button>
            <button onClick={() => handleUpdate(params.row)}>Edit</button>
          </div>
        );
      },
    },
  ];

  // Map over the products to create rows
  const rows = product.map((product, index) => ({
    id: index + 1,
    gameName: product.gameName,
    yearOfRelease: product.yearOfRelease,
    totalRating: product.totalRating,
    price: product.videoGameVersions[0]?.price,
    videoGameInfoId: product.videoGameInfoId, // Assuming this ID is available
    videoGameVersionId: product.videoGameVersions[0]?.videoGameVersionId,
  }));

  //https://fusiontech-q0v4.onrender.com/api/v1/VideoGamesInfo/${videoGameInfoId}
  const handleDelete = async (videoGameInfoId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`https://fusiontech-q0v4.onrender.com/api/v1/VideoGamesInfo/${videoGameInfoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        text: "Game has been deleted",
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

      // Optionally, you can trigger a state update here to refresh the list of products
    } catch (error) {
      console.error('Error deleting game:', error);
    }
  };


  const handleUpdate = (game) => {
    setSelectedGame(game);
    setOpenEditDialog(true);
  };
  const handleEditClose = () => {
    setOpenEditDialog(false);
    setSelectedGame(null);
  };
  console.log(selectedGame, "video game id ")
  const handleEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      const newGameName = selectedGame.gameName; // Retrieve updated game name from selectedGame state

      await axios.put(
        `https://fusiontech-q0v4.onrender.com/api/v1/VideoGamesInfo/${selectedGame.videoGameInfoId}?newGameName=${newGameName}`,
        selectedGame,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await axios.put(
        `https://fusiontech-q0v4.onrender.com/api/v1/VideoGamesInfo/${selectedGame.videoGameInfoId}/year?newYearOfRelease=${selectedGame.yearOfRelease}`,
        selectedGame,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await axios.put(
        `https://fusiontech-q0v4.onrender.com/api/v1/VideoGamesVersion/${selectedGame.videoGameVersionId}`,
        selectedGame,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        text: "Game has been updated",
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
      setOpenEditDialog(false);
    } catch (error) {
      console.error('Error updating game:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedGame(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div style={{ height: 600, width: '100%' }}>
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
            color: '#FFF',               // White pagination buttons
            '&:hover': {
              backgroundColor: '#00FF00',  // Neon green on hover for pagination buttons
            },
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
      <Dialog open={openEditDialog} onClose={handleEditClose}>
        <DialogTitle>Edit Game</DialogTitle>
        <DialogContent>
          <TextField
            label="Game Name"
            name="gameName"
            value={selectedGame?.gameName || ''}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Year of Release"
            name="yearOfRelease"
            value={selectedGame?.yearOfRelease || ''}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Price"
            name="price"
            value={selectedGame?.price || ''}
            onChange={handleInputChange}
            fullWidth
            margin="dense"
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEdit} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
