"use client";

import {
    flexRender,
    getCoreRowModel,
    useReactTable
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { PaginatedResponse, Pokemon } from "../../types";
import { PokemonDetailModal } from "../pokemon-detail-modal";
import { PaginationControl } from "./pagination-control";
import { columns } from "./pokemon-column";
import { SearchBar } from "./search-bar";

type Props = {
    data: PaginatedResponse<Pokemon>
    currentPage: number
    pageSize: number
}

export function PokemonTable({ data, currentPage, pageSize }: Props) {
    const router = useRouter();
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
    const table = useReactTable({
        data: data.results,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const createPageURL = (page: number, limit?: number, search?: string) => {
        const params = new URLSearchParams();
        params.set('page', page.toString());
        params.set('limit', (limit || pageSize).toString());
        if (search) {
            params.set('search', search);
        } else {
        }
        return `?${params.toString()}`;
    };

    const handlePageChange = (newPage: number) => {
        router.push(createPageURL(newPage));
    };

    const handleSearch = (search: string) => {
        router.push(createPageURL(1, pageSize, search));
    };

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <SearchBar onSearch={handleSearch} />
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
                                    onClick={() => setSelectedPokemon(row.original)}
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
            <PokemonDetailModal
                pokemon={selectedPokemon}
                onClose={() => setSelectedPokemon(null)}
            />
            <PaginationControl
                currentPage={currentPage}
                totalPages={Math.ceil(data.count / pageSize)}
                handlePageChange={handlePageChange}
            />
        </div>
    )
}
