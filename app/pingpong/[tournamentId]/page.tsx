"use client";

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { fetchMatchesPerTournament } from "@/app/lib/queries";
import { useState, useEffect } from 'react';
import { Bracket, IRoundProps } from 'react-brackets';

const rounds: IRoundProps[] = [
  {
    title: 'Round one',
    seeds: [
      {
        id: 1,
        date: new Date().toDateString(),
        teams: [{ name: 'Team A' }, { name: 'Team B' }],
      },
      {
        id: 2,
        date: new Date().toDateString(),
        teams: [{ name: 'Team C' }, { name: 'Team D' }],
      },
    ],
  },
  {
    title: 'Round two',
    seeds: [
      {
        id: 3,
        date: new Date().toDateString(),
        teams: [{ name: 'Team A' }, { name: 'Team C' }],
      },
    ],
  },
];

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
    <div className="flex-col flex-grow">
      <Bracket rounds={rounds} />

      <Table className="w-full h-full" aria-label="Matches in Tournament">
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
    </div>
    
  );
}

export default Page;
