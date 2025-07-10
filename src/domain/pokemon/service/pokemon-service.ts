import { PaginatedResponse, Pokemon, PokemonSearchParms } from "../types";



const DEFAULT_PAGINATED_RESPONSE: PaginatedResponse<Pokemon> = {
    count: 0,
    next: null,
    previous: null,
    results: [],
};

export class PokemonService {
    static async getPokemons(params: PokemonSearchParms): Promise<PaginatedResponse<Pokemon>> {
        // Simulate search by name
        if (params.search) {
            const pokemon = await this.getPokemonByName(params.search);
            if (!pokemon) {
                return DEFAULT_PAGINATED_RESPONSE; // not found
            }
            return {
                count: 1,
                next: null,
                previous: null,
                results: [pokemon],
            };
        }

        // Original API call
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${params.limit}&offset=${params.offset}`);
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

    static async getPokemonByName(name: string): Promise<Pokemon | null> {
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const data: Pokemon = await res.json();
            return data;
        } catch (error) {
            return null;
        }
    }
}