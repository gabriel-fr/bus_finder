import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import api from "../../services/api";
import { useEffect, useState } from 'react';
import { SearchContainer, IpuntSearch, InputLabel } from './styles';
import TextField from '@mui/material/TextField';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#3e3957',
    color: '#f6f6ea',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f8f8f8',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const [textSearch, setTextSearch] = useState('');
  const [responseData, setResponseData] = useState([]);

  function createData(name, horario, linha, dia) {
    return { name, horario, linha, dia };
  }

  const fetchData = async () => {
    try {
       const apiData = await api.get(`/datastore_search?resource_id=cb96a73e-e18b-4371-95c5-2cf20e359e6c&limit=5&q=${textSearch}`, {
         dataType: 'jsonq',
       });
       setResponseData(apiData.data.result.records);
    } catch (e) {
      console.log(e);
    }
  }

  const rows = [];
  responseData.map(e => {
      rows.push(createData(e.linha.trim(), e.horario_largada, e.linha.trim(), e.tipo_dia));
  })

  useEffect(() => {
    fetchData();
  }, [textSearch]);

  return (
    <div style={{ display: 'flex' }}>
      <SearchContainer>
          <InputLabel>Digite o nome da linha do ônibus</InputLabel>
          <IpuntSearch>
              <TextField onChange={e => setTextSearch(e.currentTarget.value)} style={{ width: '90%' }} label="Pesquisar" variant="outlined" />
          </IpuntSearch>
      </SearchContainer>
      <TableContainer component={Paper} style={{ width: '55%', margin: 'auto', height: '90vh' }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nome</StyledTableCell>
              <StyledTableCell align="right">Horário</StyledTableCell>
              <StyledTableCell align="right">Linha</StyledTableCell>
              <StyledTableCell align="right">Dia</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.horario}</StyledTableCell>
                <StyledTableCell align="right">{row.linha}</StyledTableCell>
                <StyledTableCell align="right">{row.dia}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
