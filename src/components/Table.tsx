import React, { useState, useEffect, useContext } from 'react';
import { LayerContext } from '../context/LayerContext';
import { withStyles, useTheme, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import RoomIcon from '@material-ui/icons/Room';

interface DataModel {
  address: String,
  alternance: Boolean,
  boosted: Boolean,
  city: String,
  contact_mode: String,
  headcount_text: String,
  lat: number,
  lon: number,
  matched_rome_code: String,
  matched_rome_label: String,
  matched_rome_slug: String,
  naf: String,
  naf_text: String,
  name: String,
  siret: String,
  social_network: String,
  stars: number,
  url: number,
  website: String,
}

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }),
);

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontSize: 16,
      fontWeight: 600
    },
    body: {
      fontSize: 16,
      fontWeight: 600
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  link: {
    color: "#4287f5",
    padding: "20px",
  },
});

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

export default function CustomizableTable(props: { dataTable: DataModel[], updatePage: Function, countData: number }) {
  const classes = useStyles();
  const { dataTable, updatePage, countData } = props;
  const { setPoint, setAddress } = useContext(LayerContext);

  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(10);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    updatePage(page);
  }, [page]) //eslint-disable-line

  const setMarker = (lat: number, long: number, address: String) => {
    setPoint([lat, long]);
    setAddress(address)
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nom de l'entreprise</StyledTableCell>
            <StyledTableCell align="right">Adresse</StyledTableCell>
            <StyledTableCell align="right">Nombre d'étoiles&nbsp;(embauche)</StyledTableCell>
            <StyledTableCell align="right">Ville</StyledTableCell>
            <StyledTableCell align="right">Balise du lieu</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataTable.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.name.toLocaleLowerCase()}
              </StyledTableCell>
              <StyledTableCell align="right">{row.address.toLocaleLowerCase()}</StyledTableCell>
              <StyledTableCell align="right">{row.stars} étoiles</StyledTableCell>
              <StyledTableCell align="right">{row.city.toLocaleLowerCase()}</StyledTableCell>
              <StyledTableCell align="right">
                <a
                  className={classes.link}
                  href='#mapId'
                  onClick={() => setMarker(row.lat, row.lon, row.address.toLocaleLowerCase())}
                >
                  <span
                    title={`Voir ${row.name.toLocaleLowerCase()} sur la carte`}
                    className='markerOnClick'
                  >
                    <RoomIcon />
                  </span>
                </a>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={3}
              count={countData}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[]}
              page={page}
              onChangePage={handleChangePage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}