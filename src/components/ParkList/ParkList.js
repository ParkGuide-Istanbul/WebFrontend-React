import { Box } from "@mui/material";
import React, { useState, useEffect  } from 'react';
import Button from "@material-ui/core/Button"
import SendIcon from '@mui/icons-material/Send'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import TablePagination from '@mui/material/TablePagination';
import { parkData } from '../data/parkData';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import api from '../../services/api';




const ParkList = () => {
  // ı want to get park list object witj a sample endpoint with using this func apiRequest(url, 'GET', null, headers)
 
  const [parkList, setParkList] = useState([]);
  const [parkListLoading, setParkListLoading] = useState(true);
  const [parkListError, setParkListError] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("https://o11xc731wl.execute-api.eu-central-1.amazonaws.com/dev2/listparks", {
          headers: { 'Content-Type': 'application/json' }
        });
       
        const transformedData = response.map(park => ({
          id: park.parkID,
          parkName: park.parkName,
          lat: park.lat,
          lng: park.lng,
          capacity: park.capacity,
          emptyCapacity: park.emptyCapacity,
          isActive: park.state === "1" ? "Aktif" : "İnaktif"
        }));
        
        setParkList(transformedData);
       
      } catch (error) {
        
        setParkListError(error.message);
       
      } finally {
       
        setParkListLoading(false);
       
      }
    }
    fetchData();
  }, [refreshKey]);




   
    
  const columns = [
    { 
      field: "id", 
      headerName: "Park ID" , 
      type: "Number" 
    },
    {
      field: "parkName",
      headerName: "Park İsmi",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lat",
      headerName: "Enlem",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "lng",
      headerName: "Boylam",
      flex: 1,
    },
    {
      field: "capacity",
      headerName: "Kapasite",
      flex: 1,
    },
    {
      field: "emptyCapacity",
      headerName: "Boş Kapasite",
      flex: 1,
      
    },
    {
        field: "isActive",
        headerName: "Aktiflik Durumu",
        flex: 1,
        editable : true ,
        type : "singleSelect",
        valueOptions : ["Aktif", "İnaktif"]
        
      },

      {
        field: "actions",
        type : "actions",
        headerName: "Düzenle",
        width : 100,
        cellClassName: "actions",
        getActions : ({id, isActive}) => {
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

          if(isInEditMode){
            return [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                sx={{
                  color: 'primary.main',
                }}
                onClick={handleSaveClick(id, isActive)}
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />,
            ];
          }
          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
            />,
          ];

          }
        }
        
       
        
      
  ];

  const [rows, setRows] = React.useState(columns);
  const [rowModesModel, setRowModesModel] = React.useState({});

 //////////////////////////////////////

   /////////////////////////////
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleSelectionModelChange = (newSelectionModel) => {
    setSelectedRows(newSelectionModel);
    console.log("Selected Rows:", newSelectionModel); // Debugging line
    debugger;
  };

  const handleSubmit = async () => {
    console.log("Selected Rows on Submit:", selectedRows); // Debugging line
    debugger;
    const payload = {
      parks: selectedRows.map((id) => {
        const row = parkList.find((row) => row.id === id);
        debugger;
        return {
          parkId: row.id.toString(),
          state: row.isActive === "Aktif" ? "1" : "0",
        };
      }),
    };
    console.log("Payload:", payload); // Debugging line
    debugger;
    try {
      await api.post("https://o11xc731wl.execute-api.eu-central-1.amazonaws.com/dev2/configurestateparks", payload, {
        headers: { 'Content-Type': 'application/json' }
      });
      setRefreshKey(oldKey => oldKey + 1);
    } catch (error) {
      // Handle error
      console.error("Error submitting parks: ", error);
    }
  };

  const handleUpdateParkList = (id, isActive) =>{
    let updatedParkList = parkList.map((item)=>
      item.id === id ? {...item, isActive: isActive} : item
    );
    setParkList(updatedParkList);
  }

  const handleEditClick = (id) => () => {
    
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id, isActive) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    handleUpdateParkList(id, isActive);
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };
  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };



  
  return (
    <Box key={refreshKey} m="20px">
      
      <Box
        m="40px 0 0 0"
        height="70vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
           
          },
          "& .MuiDataGrid-columnHeaders": {
     
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
        
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
     
          },
          "& .MuiCheckbox-root": {
        
          },
        }}
      >
        <DataGrid checkboxSelection 
        rows={parkList} 
        columns={columns}
        editMode="row"
        initialState={{
          pagination: {
            paginationModel : {
              pageSize : 10
            }
          } 
        }}
        pageSizeOptions={10}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowSelectionModelChange={handleSelectionModelChange}

        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
       
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }} 
        />

   
      </Box>
    

      
      <Button variant = "contained" color ="secondary"  endIcon= {<SendIcon />} onClick={handleSubmit}>
        SUBMIT
      </Button>
    </Box>
  );
};

export default ParkList;