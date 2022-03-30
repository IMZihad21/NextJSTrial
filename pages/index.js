import { Box, Typography } from '@mui/material'
import Link from 'next/link';
import useSWR from 'swr'
import fetcher from '../utils/fetcher';

export default function Home() {
  const { data, error } = useSWR('/api/', fetcher);
  return (
    <Box>
      <Typography>
        {error ? "Failed" : data?.message}
      </Typography>
      <Link href='/blog'>Blogs</Link>
    </Box>
  )
}