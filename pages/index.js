import { Box, Typography } from '@mui/material'
import Link from 'next/link';
import useSWR from 'swr'
import fetcher from '../utils/fetcher';

export default function Home({ api }) {
  return (
    <Box>
      <Typography>
        {api?.message}
      </Typography>
      <Link href='/blog'>Blogs</Link>
    </Box>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.API_HOST}/api`);
  const api = await res.json()

  return {
    props: {
      api
    }
  }
}
