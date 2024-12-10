import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ChipComponent from "./ChipComponent";
import MoreIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import { Popover, TableSortLabel } from "@mui/material";

// Helper function to sort data
const descendingComparator = (a: any, b: any, orderBy: string) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order: "asc" | "desc", orderBy: string) => {
  return order === "desc"
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array: any[], comparator: any) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

interface TableComponentProps {
  tableHeadData: string[];
  tableBodyData: Array<{ [key: string]: string | number }>;
  popoverContent: React.ReactNode;
}

const TableComponent: React.FC<TableComponentProps> = ({
  tableHeadData,
  tableBodyData,
  popoverContent,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = React.useState<string>("");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // Sort the table body data based on the current sorting state
  const sortedData = stableSort(tableBodyData, getComparator(order, orderBy));

  return (
    <TableContainer
      sx={{
        backgroundColor: "white",
        borderRadius: 2,
        maxHeight: 590,
        "&::-webkit-scrollbar": {
          width: 4, // Width of the scrollbar
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#f0f0f0", // Scrollbar track color
          borderRadius: 4,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#D9D9D9", // Scrollbar thumb color
          borderRadius: 4,
          "&:hover": {
            backgroundColor: "#909090", // Thumb color on hover
          },
        },
      }}
    >
      <Table
        sx={{ minWidth: 300, minHeight: "100%" }}
        stickyHeader
        aria-label="dynamic table"
      >
        <TableHead
          sx={{
            backgroundColor: "#DCE5F6",
            "& .MuiTableCell-head": {
              fontWeight: "bold",
              color: "#0F2043",
              fontSize: "0.875rem",
            },
          }}
        >
          <TableRow>
            {tableHeadData.map((header, index) => (
              <TableCell
                key={index}
                align="center"
                sx={{
                  fontWeight: "bold",
                  color: "#0F2043",
                  fontSize: "0.875rem",
                  backgroundColor: "#DCE5F6",
                }}
                sortDirection={orderBy === header ? order : false}
              >
                <TableSortLabel
                  active={orderBy === header}
                  direction={orderBy === header ? order : "asc"}
                  onClick={() => handleRequestSort(header)}
                >
                  {header}
                </TableSortLabel>
              </TableCell>
            ))}
            {/* Add the MoreIcon to the table header */}
            <TableCell
              align="center"
              sx={{
                fontWeight: "bold",
                color: "#0F2043",
                fontSize: "0.875rem",
                backgroundColor: "#DCE5F6",
              }}
            ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            "& .MuiTableCell-body": { color: "#0F2043", fontSize: "0.875rem" },
          }}
        >
          {sortedData.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {tableHeadData.map((header, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  align="center"
                  sx={{
                    maxWidth: 150,
                    wordWrap: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  {header === "Status" && typeof row[header] === "string" ? (
                    <ChipComponent label={row[header] as string} />
                  ) : (
                    row[header]
                  )}
                </TableCell>
              ))}

              <TableCell align="right" width={5}>
                <IconButton
                  aria-label="more-options"
                  aria-describedby={id}
                  onClick={handleClick}
                >
                  <MoreIcon />
                </IconButton>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  PaperProps={{
                    disableInteractive: true,
                  }}
                  sx={{
                    ".MuiPaper-root": {
                      maxWidth: "100%",
                      boxShadow: "none",
                      border: "1px solid",
                      borderColor: "#DBDEE3",
                      borderRadius: 3,
                    },
                  }}
                >
                  {popoverContent}
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
