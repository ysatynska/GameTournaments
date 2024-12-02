"use client";

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { fetchMatchesPerTournament } from "@/app/lib/queries";
import { useState, useEffect } from 'react';

const columns = [
  {
    key: "p1",
    label: "PLAYER 1",
  },
  {
    key: "p2",
    label: "PLAYER 2",
  },
  {
    key: "score",
    label: "SCORE",
  },
];


function Page({ params }: { params: { tournamentId: number } }) {
  const { tournamentId } = params;
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const fetchedRows = await fetchMatchesPerTournament(tournamentId);
      setRows(fetchedRows);
    };
    loadData();
  }, [tournamentId]);

  return (
    <Table aria-label="Matches in Tournament">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => <TableCell>{item[columnKey]}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default Page;
