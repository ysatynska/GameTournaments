
'use client'
import React from "react";
import { GamePlayer } from '@/app/lib/definitions';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination} from "@nextui-org/react";

const getKeyValue = (item: any, columnKey: any) => {
  if (columnKey === "created_at") {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(item[columnKey]));
  }
  return item[columnKey];
};

export default function GamesTable({games}: {games: GamePlayer[]}) {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 6;

  const pages = Math.ceil(games.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return games.slice(start, end);
  }, [page, games]);

  return (
    <>
      <Table 
        aria-label="Games Table"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn key="created_at">Date Submitted</TableColumn>
          <TableColumn key="player1_name">Player 1</TableColumn>
          <TableColumn key="player2_name">Player 2</TableColumn>
          <TableColumn key="score1">Score 1</TableColumn>
          <TableColumn key="score2">Score 2</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
