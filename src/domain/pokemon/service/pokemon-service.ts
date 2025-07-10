import { EvolutionTrigger, PaginatedResponse, Pokemon, PokemonDetail, PokemonSearchParms } from "../types";



const DEFAULT_PAGINATED_RESPONSE: PaginatedResponse<never> = {
    count: 0,
    next: null,
    previous: null,
    results: [],
};

export class PokemonService {
    static readonly BASE_URL = "https://pokeapi.co/api/v2";
    static async getPokemons(params: PokemonSearchParms): Promise<PaginatedResponse<Pokemon>> {
        // Simulate search by name
        if (params.search) {
            const pokemonDetail = await this.getPokemonByName(params.search);
            if (!pokemonDetail) {
                return DEFAULT_PAGINATED_RESPONSE; // not found
            }
            return {
                count: 1,
                next: null,
                previous: null,
                results: [{
                    name: pokemonDetail.name,
                    url: `${this.BASE_URL}/pokemon/${pokemonDetail.id}`,
                }],
            };
        }

        // Original API call
        try {
            const res = await fetch(`${this.BASE_URL}/pokemon?limit=${params.limit}&offset=${params.offset}`);
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

    static async getPokemonByName(name: string): Promise<PokemonDetail | null> {
        try {
            const res = await fetch(`${this.BASE_URL}/pokemon/${name}`);
            const data: PokemonDetail = await res.json();
            return data;
        } catch {
            return null;
        }
    }

    static async getEvolutionTriggers() {
        try {
            const res = await fetch(`${this.BASE_URL}/evolution-trigger`);
            const data: PaginatedResponse<EvolutionTrigger> = await res.json();
            return data;
        } catch {
            return DEFAULT_PAGINATED_RESPONSE;
        }
    }
}