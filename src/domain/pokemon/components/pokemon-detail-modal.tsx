import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import useSWR from "swr";
import { Pokemon, PokemonDetail } from "../types";

type Props = {
    pokemon: Pokemon | null
    onClose: () => void
}

const fetcher = (url: string) => fetch(url).then(res => res.json() as Promise<PokemonDetail>);

export const PokemonDetailModal = ({ pokemon, onClose }: Props) => {
    const { data } = useSWR(pokemon?.url ?? null, fetcher);
    if (!pokemon) {
        return null;
    }
    return (
        <Dialog open onOpenChange={(open) => !open && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{pokemon.name}</DialogTitle>
                    <DialogDescription>
                        Details about {pokemon.name}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    <h2 className="text-lg">Abilities</h2>
                    <div className="flex flex-wrap gap-2">
                        {data?.abilities.map((ability) => (
                            <Badge key={ability.ability.name}>{ability.ability.name}</Badge>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-lg">Items</h2>
                    <div className="flex flex-wrap gap-2">
                        {data?.held_items.map((item) => (
                            <Badge key={item.item.name}>{item.item.name}</Badge>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}