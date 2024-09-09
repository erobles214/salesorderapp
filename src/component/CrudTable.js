import React, { useMemo, useState, useEffect, useCallback } from 'react';
// import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import {
  Box,
  // Button,
  // Dialog,
  // DialogActions,
  // DialogContent,
  // DialogTitle,
  IconButton,
  // MenuItem,
  // Stack,
  // TextField,
  Tooltip,
} from '@mui/material';
import { Edit, Engineering } from '@mui/icons-material';
// import { object } from 'yup';
// import data from '../Data/orderData.json';

// const getCommonEditTextFieldProps = {};

// eslint-disable-next-line react/prop-types
const CrudTable = ({ data }) => {
  const [tableData, setTableData] = useState(() => []);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const getCommonEditTextFieldProps = useCallback((cell) => {
    return {
      error: !!validationErrors[cell.id],
      helperText: validationErrors[cell.id],
      onBlur: (event) => {
        const isValid =
          cell.column.id === 'email'
            ? validateEmail(event.target.value)
            : cell.column.id === 'age'
            ? validateAge(+event.target.value)
            : validateRequired(event.target.value);
        if (!isValid) {
          //set validation error for cell if invalid
          setValidationErrors({
            ...validationErrors,
            [cell.id]: `${cell.column.columnDef.header} is required`,
          });
        } else {
          //remove validation error for cell if valid
          delete validationErrors[cell.id];
          setValidationErrors({
            ...validationErrors,
          });
        }
      },
    };
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (typeof data.data !== 'undefined') {
      // eslint-disable-next-line react/prop-types
      setTableData(Object.values(data.data[0].workOrders));
    }
  }, [data]);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id', // access nested data with dot notation
        header: 'Work Order Id',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'businessDate',
        header: 'Business Date',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'materialOrderId',
        header: 'Material Order Id',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: 'laborOrderId',
        header: 'Labor Order Id',
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      // {
      //   accessorKey: 'materialOrderId',
      //   header: 'Material Order Id',
      //   muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
      //     ...getCommonEditTextFieldProps(cell),
      //   }),
      // },
      // {
      //   accessorKey: 'laborOrderId',
      //   header: 'Labor Order Id',
      //   muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
      //     ...getCommonEditTextFieldProps(cell),
      //   }),
      // },
    ],
    [getCommonEditTextFieldProps],
  );

  // eslint-disable-next-line react/prop-types
  // return <MaterialReactTable columns={columns} data={data} />;
  return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center',
            },
            size: 120,
          },
        }}
        columns={columns}
        data={tableData}
        editingMode="modal" // default
        enableColumnOrdering
        enableEditing
        // onEditingRowSave={handleSaveRowEdits}
        // onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton
                color="error"
                onClick={() => table.setEditingRow(row)}
              >
                <Engineering />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      />
    </>
  );
};

const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

    const validateAge = (age) => age >= 18 && age <= 50;
export default CrudTable;
