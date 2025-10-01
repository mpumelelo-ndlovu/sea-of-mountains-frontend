import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Application Data
function createData(id, date, name, fundingSource, status, deposit) {
  return { id, date, name, fundingSource, status, deposit };
}

const rows = [
  createData(
    0,
    '01 Oct, 2025',
    'Elvis Presley',
    'NSFAS',
    'Approved',
    312.44,
  ),
  createData(
    1,
    '01 Oct, 2025',
    'Paul McCartney',
    'Self-Paying',
    'Pending',
    866.99,
  ),
  createData(2, '01 Oct, 2025', 'Tom Scholz', 'Bursary', 'Approved', 100.81),
  createData(
    3,
    '01 Oct, 2025',
    'Michael Jackson',
    'NSFAS',
    'Pending',
    654.39,
  ),
  createData(
    4,
    '30 Sep, 2025',
    'Bruce Springsteen',
    'Self-Paying',
    'Declined',
    212.79,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function RecentApplications() {
  return (
    <React.Fragment>
      <Title>Recent Applications</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Funding Source</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Deposit Paid</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.fundingSource}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell align="right">{`R${row.deposit}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more applications
      </Link>
    </React.Fragment>
  );
}
