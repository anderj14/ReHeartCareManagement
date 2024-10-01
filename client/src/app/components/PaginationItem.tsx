// PaginationItem.js
import { Box, Pagination as Pagination, Typography } from '@mui/material';
import { Metadata } from '../Models/pagination';

interface Props {
    metaData: Metadata;
    onPageChange: (page: number) => void;
    name: string
}

const PaginationItem = ({ metaData, onPageChange, name }: Props) => {
    const { currentPage, totalPages } = metaData;

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        onPageChange(page);
    };

    return (
        <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography>
                Showing {(currentPage - 1) * metaData.pageSize + 1} -{' '}
                {Math.min(currentPage * metaData.pageSize, metaData.count)} of {metaData.count} {name}
            </Typography>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
            />
        </Box>
    );
};

export default PaginationItem;
