"use client";

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import { useRouter, useSearchParams } from "next/navigation";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { PaginatedResponse } from "../../service/pokemon-service";
import { Pokemon } from "../../types";
import { PaginationControl } from "./pagination-control";
import { columns } from "./pokemon-column";

type Props = {
    data: PaginatedResponse<Pokemon>
    currentPage: number
    pageSize: number
}

export function PokemonTable({ data, currentPage, pageSize }: Props) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const table = useReactTable({
        data: data.results,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    const createPageURL = (page: number, limit?: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        params.set('limit', (limit || pageSize).toString());
        return `?${params.toString()}`;
    };

    const handlePageChange = (newPage: number) => {
        router.push(createPageURL(newPage));
    };

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <form>
                    <Input
                        placeholder="Search Pokemons..."
                        className="max-w-sm"
                    />
                </form>
                <div className="ml-auto flex items-center space-x-2">
                    <DropdownMenu>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <PaginationControl
                currentPage={currentPage}
                totalPages={Math.ceil(data.count / pageSize)}
                handlePageChange={handlePageChange}
            />
        </div>
    )
}
