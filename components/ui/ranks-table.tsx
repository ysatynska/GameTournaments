'use client'
import React from "react";
import { usePathname } from 'next/navigation';
import { RankRating } from '@/app/lib/definitions';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react";

function getKeyValue (item: any, columnKey: any, page: any, rowsPerPage: any, index: any) {
  if (columnKey == "rowNumber") {
    return index + 1;
  } else {
    return item[columnKey];
  }
}

export default function RanksTable({ ranks }: { ranks: RankRating[] }) {
  const pathname = usePathname();
  const [page, setPage] = React.useState(1);
  const rowsPerPage = pathname === '/' ? 5 : 13;

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
          <TableColumn key="rowNumber">Rank</TableColumn>
          <TableColumn key="name">Name</TableColumn>
          <TableColumn key="rating">Rating</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => {
            const index = ranks.indexOf(item);
            return (
              <TableRow key={item.player_id}>
                {(columnKey) => <TableCell>{getKeyValue(item, columnKey, page, rowsPerPage, index)}</TableCell>}
              </TableRow>
            );
          }}
        </TableBody>
      </Table>
    </>
  );
}
