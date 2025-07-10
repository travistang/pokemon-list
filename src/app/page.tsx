import { getPaginationParams } from "@/domain/common/utils/get-pagination-params";
import { PokemonTable } from "@/domain/pokemon/components/pokemon-table/pokemon-table";
import { PokemonService } from "@/domain/pokemon/service/pokemon-service";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Dashboard({ searchParams }: Props) {
  const { page, limit, offset } = getPaginationParams({
    searchParams: await searchParams
  });

  const data = await PokemonService.getPokemons(limit, offset);

  return (
    <div className="flex flex-col h-screen p-4">
      <h1 className="text-2xl font-bold">Pokemon List</h1>
      <div className="container">
        <PokemonTable data={data} currentPage={page} pageSize={limit} />
      </div>
    </div>
  )
}
