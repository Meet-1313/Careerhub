import { Button } from "@/components/ui/Button";

function Pagination ({ currentPage, totalPages, onPageChange}) {
    if (totalPages <= 1) {
        return null;
    }

    const pages = [];

    for ( let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className='flex flex-wrap justify-center gap-2 mt-10'>
            <Button variant="outline" disabled={currentPage === 1} 
                    onClick={() => onPageChange(currentPage - 1)}>
                    Previous
            </Button>

            {pages.map((page) => (
            <Button key={page} 
                    variant={ page === currentPage ? "default" : "outline" }
                    onClick={() => onPageChange(page)}>
                        {page}
            </Button>
            ))}

            <Button variant='outline' disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}>
                    Next
            </Button>
        </div>
    );
}

export default Pagination;