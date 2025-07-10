import { Pokemon } from "../types";

export type PaginatedResponse<T> = {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}
export class PokemonService {
    static async getPokemons(limit: number, offset: number): Promise<PaginatedResponse<Pokemon>> {
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
            const data: PaginatedResponse<Pokemon> = await res.json();
            return data;
        } catch (error) {
            console.error(error);
            return {
                count: 0,
                next: null,
                previous: null,
                results: [],
            };
        }
    }
}