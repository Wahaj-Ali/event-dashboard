import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { DialogContent } from '@mui/material';
import { Grid } from '@mui/material';
import { Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { getEventsData } from '../api';
import Image from "next/image";
import LoaderImage from '../../assets/loader.svg';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  border: 'none',
  '&:hover': {
    backgroundColor: 'rgb(69 51 201 / 4%)',
    cursor: 'pointer',
  },
}));


export default function EvenstList() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleFavoriteClick = (clickedRow) => {
    const updatedData = data.map(row => {
      if (row === clickedRow) {
        return { ...row, favorite: !row.favorite };
      }
      return row;
    });
    setData(updatedData);
  };

  React.useEffect(() => {
    const fetchDataFromApi = async () => {
      setLoading(true);
      try {
        const { events } = await getEventsData();
        setLoading(false);
        const initialData = events.map(event => ({ ...event, favorite: false }));
        setData(initialData);
      } catch (error) {
        setLoading(false);
      }
      finally {
        setLoading(false);
      }
    };
    fetchDataFromApi();
  }, []);

  return (
    <>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}
        sx={{
          '& .MuiDialog-paper': {
            minWidth: 800,
            maxWidth: 838,
            borderRadius: '20px',
            '@media (max-width: 1023px)': {
              minWidth: '336px',
              height: '444px'
            }
          }
        }}
      >
        <DialogTitle
          sx={{
            color: '#333',
            fontFamily: 'Inter',
            fontSize: '32px',
            fontWeight: 600,
            lineHeight: '26px',
            maxWidth: '600px'
          }}
        >
          {selectedRow && selectedRow.title}</DialogTitle>
        <DialogContent>
          <Typography variant="h6"
            sx={{
              fontFamily: 'Inter',
              fontSize: '20px',
              fontWeight: 400,
              lineHeight: '20px',
              textAlign: 'left',
              paddingBottom: '10px'
            }}
          >
            Description
          </Typography >
          <Typography variant="p" sx={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 400, lineHeight: '23.28px' }}>
            {selectedRow && selectedRow.description}
          </Typography>
        </DialogContent>
        <Divider />
        <Grid container justifyContent="center" alignItems="center" sx={{ padding: '20px 0' }}>
          <Grid item>
            <LocationOnIcon fontSize="large" />
          </Grid>
          <Grid item sx={{ marginLeft: '10px' }}>
            <Typography variant="body1" sx={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 400, lineHeight: '23.28px' }}>
              {selectedRow && selectedRow.country}
            </Typography>
          </Grid>
        </Grid>
      </Dialog>

      <TableContainer component={Paper} className="events-list-wrapper">
        {loading ? (
          <div className="text-center">
            <Image width="60" height="60" src={LoaderImage} alt="loader" />
          </div>
        ) : data.length === 0 ? (
          <div className="text-center">No events found.</div>
        ) : (
          <Table sx={{ minWidth: 350 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" width={50} sx={{ textTransform: 'uppercase', fontWeight: '600' }}>#</TableCell>
                <TableCell align="left" width={200} sx={{ textTransform: 'uppercase', fontWeight: '600' }}>Name</TableCell>
                <TableCell align="left" width={200} sx={{ textTransform: 'uppercase', fontWeight: '600' }}>Time</TableCell>
                <TableCell align="left" width={200} sx={{ textTransform: 'uppercase', fontWeight: '600' }}>Date</TableCell>
                <TableCell align="left" width={200} sx={{ textTransform: 'uppercase', fontWeight: '600' }}>Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <StyledTableRow
                  key={row.rank}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={() => handleRowClick(row)}
                >
                  <TableCell align="left">{row.rank}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="left">
                    {(() => {
                      const parsedTime = new Date(row.updated);
                      let hours = parsedTime.getHours();
                      const minutes = parsedTime.getMinutes();
                      const amPM = hours >= 12 ? 'PM' : 'AM';
                      hours = hours % 12 || 12;
                      return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${amPM}`;
                    })()}
                  </TableCell>
                  <TableCell align="left">
                    {(() => {
                      const parsedTime = new Date(row.updated);
                      const year = parsedTime.getFullYear();
                      const month = parsedTime.getMonth() + 1;
                      const day = parsedTime.getDate();
                      return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
                    })()}
                  </TableCell>
                  <TableCell align="left">{row.country}</TableCell>
                  <TableCell align="left">
                    <IconButton onClick={(e) => { e.stopPropagation(); handleFavoriteClick(row); }}>
                      {row.favorite ? <FavoriteIcon sx={{ color: '#DC0000' }} /> : <FavoriteBorderIcon />}
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </>
  );
}