export type Pokemon = {
    name: string;
    url: string;
}

export type PokemonDetail = {
    name: string;
    id: number;
    held_items: {
        item: {
            name: string;
            url: string;
        }
    }[];
    abilities: {
        ability: {
            name: string;
            url: string;
        }
    }[];
}

export type PaginatedResponse<T> = {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

export type PokemonSearchParms = {
    limit: number;
    offset: number;
    search: string;
}