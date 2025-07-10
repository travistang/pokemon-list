import { EvolutionTriggerTable } from "@/domain/pokemon/components/evolution-trigger-table/evolution-trigger-table";
import { PokemonService } from "@/domain/pokemon/service/pokemon-service";
import Link from "next/link";
export default async function EvolutionTriggerPage() {
    const data = await PokemonService.getEvolutionTriggers();
    return (
        <div className="flex flex-col h-screen p-4">
            <div className="flex items-center justify-between py-4">
                <h1 className="text-2xl font-bold">Evolution Triggers</h1>
                <Link href="/" className="underline">Back to Pokemon List</Link>
            </div>
            <div className="container">
                <EvolutionTriggerTable data={data} />
            </div>
        </div>
    );
}