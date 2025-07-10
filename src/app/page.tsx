import { getPaginationParams } from "@/domain/common/utils/get-pagination-params";
import { PokemonTable } from "@/domain/pokemon/components/pokemon-table/pokemon-table";
import { PokemonService } from "@/domain/pokemon/service/pokemon-service";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Dashboard({ searchParams }: Props) {
  const params = await searchParams;
  const { page, limit, offset } = getPaginationParams({
    searchParams: params
  });

  const search = params.search as string;

  const data = await PokemonService.getPokemons({ limit, offset, search });

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-bold">Pokemon List</h1>
        <Link href="/evolution-triggers" className="underline">Evolution Triggers</Link>
      </div>
      <div className="container">
        <PokemonTable data={data} currentPage={page} pageSize={limit} />
      </div>
    </div>
  )
}
