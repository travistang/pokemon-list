import { ColumnDef } from "@tanstack/react-table";
import { Pokemon } from "../../types";

export const columns: ColumnDef<Pokemon>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "url",
        header: "URL",
        cell: ({ row }) => <div className="lowercase">{row.getValue("url")}</div>,
    }
];