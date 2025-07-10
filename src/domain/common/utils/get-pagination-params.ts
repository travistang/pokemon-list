type Props = {
    searchParams: { [key: string]: string | string[] | undefined }
}

export function getPaginationParams({ searchParams }: Props) {
    const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 2; // so that the offset is 20
    const limit = typeof searchParams.limit === 'string' ? parseInt(searchParams.limit) : 20;
    const offset = (page - 1) * limit;
    return { page, limit, offset };
}