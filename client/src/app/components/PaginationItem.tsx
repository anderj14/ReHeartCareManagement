// PaginationItem.js
import { Box, Pagination as MuiPagination, Pagination, Typography } from '@mui/material';
import { Metadata } from '../Models/pagination';

interface Props {
    metaData: Metadata;
    onPageChange: (page: number) => void;
}

const PaginationItem = ({ metaData, onPageChange }: Props) => {
    const { currentPage, totalPages } = metaData;

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        onPageChange(page);
    };

    return (
        <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography>
                Showing {(currentPage - 1) * metaData.pageSize + 1} -{' '}
                {Math.min(currentPage * metaData.pageSize, metaData.count)} of {metaData.count} Patients
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
