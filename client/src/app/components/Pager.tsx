// PaginationItem.js
import { Box, Pagination, Typography } from '@mui/material';
import { Metadata } from '../Models/pagination';

interface Props {
    metaData: Metadata;
}

const Pager = ({ metaData }: Props) => {
    const { currentPage, totalPages } = metaData;

    return (
        <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography>
                Showing <strong>{(currentPage - 1) * metaData.pageSize + 1} -{' '}
                    {Math.min(currentPage * metaData.pageSize, metaData.count)} </strong>
                of <strong>{metaData.count}</strong> Patients
            </Typography>
        </Box>
    );
};

export default Pager;
