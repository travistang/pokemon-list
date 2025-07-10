import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
    onSearch: (search: string) => void;
}
export const SearchBar = ({ onSearch }: Props) => {
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const search = formData.get('search') as string;
        onSearch(search);
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <Input name="search" placeholder="Search Pokemons..." className="max-w-sm" />
            <Button variant="outline" type="submit">Search</Button>
        </form>
    );
}