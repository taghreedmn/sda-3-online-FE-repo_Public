import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItem from './ProductItem';
import swal from 'sweetalert';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Select, MenuItem } from '@mui/material';
import './Dashboard.css';

export default function ProductDashBoard() {
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [productList, setProductList] = useState({
        products: [],
        totalCount: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const url = "http://localhost:5125/api/v1/VideoGamesInfo/Detailed?MinPrice=0&MaxPrice=1000&Limit=100&Offset=0";

    const [newProduct, setNewProduct] = useState({
        gameName: '',
        description: '',
        yearOfRelease: '',
        totalRating: 0,
        publisherId: '',
        categoryIds: [],
        gameStudioIds: [],
        videoGameVersions: [{ gameConsoleId: '', price: 0.0 }],
    });
    const [publishers, setPublishers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [studios, setStudios] = useState([]);
    const [consoles, setConsoles] = useState([]);

    function fetchData() {
        axios.get(url)
            .then((response) => {
                setProductList({
                    products: response.data.videoGamesInfos || [],
                    totalCount: response.data.totalCount || 0
                });
                setLoading(false);
            })
            .catch((error) => {
                setError("Failed to fetch data");
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchData();
    }, []);

    // Fetch options for dropdowns
    useEffect(() => {
        axios.get("http://localhost:5125/api/v1/Publisher")
            .then((response) => setPublishers(response.data))
            .catch((error) => console.error("Error fetching publishers", error));

        axios.get("http://localhost:5125/api/v1/Categories")
            .then((response) => setCategories(response.data))
            .catch((error) => console.error("Error fetching categories", error));

        axios.get("http://localhost:5125/api/v1/GameStudio")
            .then((response) => setStudios(response.data))
            .catch((error) => console.error("Error fetching studios", error));

        axios.get("http://localhost:5125/api/v1/Console")
            .then((response) => setConsoles(response.data))
            .catch((error) => console.error("Error fetching consoles", error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prevState => {
            if (name === 'categoryIds') {
                return {
                    ...prevState,
                    categoryIds: [value] // Wrap the value in an array
                };
            } else if (name === 'gameStudioIds') {
                return {
                    ...prevState,
                    gameStudioIds: [value] // Wrap the value in an array
                };
            } else if (name === 'gameConsoleId') {
                return {
                    ...prevState,
                    videoGameVersions: [{ ...prevState.videoGameVersions[0], gameConsoleId: value }]
                };
            } else {
                return {
                    ...prevState,
                    [name]: value,
                };
            }
        });
    };


    const handleCreateProduct = async () => {
        console.log(newProduct, "new Product from handler")
        swal({ text: `${newProduct}`, icon: "success", timer: 5000, button: false });
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5125/api/v1/VideoGamesInfo', newProduct, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setOpenCreateDialog(false);
            swal({ text: "Game created", icon: "success", timer: 1500, button: false });
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };
    return (
        <div>
            <div className="create">
                <Button variant="contained" color="primary" onClick={() => setOpenCreateDialog(true)}>
                    Create New Product
                </Button>
            </div>
            <ProductItem
                product={productList.products}
                totalCount={productList.totalCount}
            />
            <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)}>
                <DialogTitle>Create New Game</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Game Name"
                        name="gameName"
                        onChange={handleInputChange}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Description"
                        name="description"
                        onChange={handleInputChange}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Year of Release"
                        name="yearOfRelease"
                        onChange={handleInputChange}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Total Rating"
                        name="totalRating"
                        onChange={handleInputChange}
                        fullWidth
                        margin="dense"
                        type="number"
                    />
                    <TextField
                        label="Price"
                        name="price"
                        value={newProduct.videoGameVersions[0]?.price || ''}
                        onChange={(e) => setNewProduct(prevState => ({
                            ...prevState,
                            videoGameVersions: [{ ...prevState.videoGameVersions[0], price: parseFloat(e.target.value) }]
                        }))}
                        fullWidth
                        margin="dense"
                        type="number"
                    />
                    <Select
                        name="publisherId"
                        value={newProduct.publisherId}
                        onChange={handleInputChange}
                        fullWidth
                        displayEmpty
                    >
                        <MenuItem value="">Select Publisher</MenuItem>
                        {publishers.map((pub) => (
                            <MenuItem key={pub.publisherId} value={pub.publisherId}>{pub.publisherName}</MenuItem>
                        ))}
                    </Select>
                    <Select
                        name="categoryIds"
                        value={newProduct.categoryIds}
                        onChange={handleInputChange}
                        fullWidth
                        displayEmpty
                    >
                        <MenuItem value="">Select Category</MenuItem>
                        {categories.map((cat) => (
                            <MenuItem key={cat.categoryId} value={cat.categoryId}>{cat.categoryName}</MenuItem>
                        ))}
                    </Select>
                    <Select
                        name="gameStudioIds"
                        value={newProduct.gameStudioIds}
                        onChange={handleInputChange}
                        fullWidth
                        displayEmpty
                    >
                        <MenuItem value="">Select Game studio</MenuItem>
                        {studios.map((studio) => (
                            <MenuItem key={studio.gameStudioId} value={studio.gameStudioId}>{studio.studioName}</MenuItem>
                        ))}
                    </Select>
                    <Select
                        name="gameConsoleId"
                        value={newProduct.videoGameVersions[0]?.gameConsoleId || ''}
                        onChange={(e) => setNewProduct(prevState => ({
                            ...prevState,
                            videoGameVersions: [{ gameConsoleId: e.target.value, price: prevState.videoGameVersions[0].price }]
                        }))}
                        fullWidth
                        displayEmpty
                    >
                        <MenuItem value="">Select Console</MenuItem>
                        {consoles.map((console) => (
                            <MenuItem key={console.gameConsoleId} value={console.gameConsoleId}>{console.consoleName}</MenuItem>
                        ))}
                    </Select>
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCreateDialog(false)}>Cancel</Button>
                    <Button onClick={handleCreateProduct} color="primary">Create</Button>
                </DialogActions>
            </Dialog>
            
        </div>
    );
}
