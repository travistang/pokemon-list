import { Button } from "@/components/ui/button";

type Props = {
    currentPage: number;
    totalPages: number;
    handlePageChange: (page: number) => void;
}
export const PaginationControl = ({ currentPage, totalPages, handlePageChange }: Props) => {
    return (
        <div className="flex items-center justify-between space-x-2 py-4">
            <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center space-x-2">
                <Button
                    disabled={currentPage <= 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    variant="outline"
                    size="sm"
                >
                    Previous
                </Button>
                <Button
                    disabled={currentPage >= totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    variant="outline"
                    size="sm"
                >
                    Next
                </Button>
            </div>
        </div>
    );
}