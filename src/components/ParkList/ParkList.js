import { Box } from "@mui/material";


import Button from "@material-ui/core/Button"
import React from 'react'
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



const ParkList = () => {
   
  
   
    
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
        getActions : ({id}) => {
          const isInEditMode = rowModesModel[id]?.mode == GridRowModes.Edit;

          if(isInEditMode){
            return [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                sx={{
                  color: 'primary.main',
                }}
                onClick={handleSaveClick(id)}
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

  const handleEditClick = (id) => () => {
    
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
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
    <Box m="20px">
      
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
        rows={parkData} 
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
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
       
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }} 
        />

   
      </Box>
    

      
      <Button variant = "contained" color ="secondary"  endIcon= {<SendIcon />}>
        SUBMIT
      </Button>
    </Box>
  );
};

export default ParkList;