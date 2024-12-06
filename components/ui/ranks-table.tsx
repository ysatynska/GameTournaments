
'use client'
import React from "react";
import { RankRating } from '@/app/lib/definitions';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue} from "@nextui-org/react";

// const getKeyValue = (item: any, columnKey: any, row_count: number) => {
//   if (columnKey === "rank") {
//     row_count++;
//     return row_count;
//   }
//   return item[columnKey];
// };

export default function RanksTable({ranks}: {ranks: RankRating[]}) {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 6;
  console.log(ranks);

  const pages = Math.ceil(ranks.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return ranks.slice(start, end);
  }, [page, ranks]);

  return (
    <>
      <Table 
        aria-label="Ranks Table"
        shadow="md"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="default"
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
          {/* <TableColumn key="rank">Rank</TableColumn> */}
          <TableColumn key="name">Player Name</TableColumn>
          <TableColumn key="rating">Rating</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.player_id}>
              {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
