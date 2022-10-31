import React from "react";
import { TableContainer } from "@mui/material";
import Table from "@mui/material/Table";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { useMemo } from "react";
function UserListTable({ tableData }) {
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);
    const [rows, setRows] = React.useState([]);


    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    const genaratedTable = useMemo(() =>{

        const iniIndex = page * rowsPerPage;
        const secIndex = iniIndex +  rowsPerPage

        return tableData.slice(iniIndex, secIndex)

        // return tableData.splice(indecx , rowsPerPage)
    }, [tableData , page,rowsPerPage]);


    return (
        <Paper>
            <TableContainer sx={{ backgroundColor: "#f5f5f5" }}>

                <Table className="table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email Address</th>
                            <th>User Name</th>
                            <th>Phone Number</th>

                        </tr>
                    </thead>
                    <tbody>
                        {genaratedTable
                            .map((data, index) => {

                                console.log(data);

                                return (
                                    <tr key={index}>
                                        <td>{data.firstName}</td>
                                        <td>{data.lastName}</td>
                                        <td>{data.email}</td>
                                        <td>{data.userName}</td>
                                        <td>{data.phoneNumber}</td>

                                    </tr>
                                )
                            })}

                    </tbody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={tableData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>

        </Paper>

    );


}
export default UserListTable;