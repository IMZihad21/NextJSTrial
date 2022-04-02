import { Box, Typography } from '@mui/material'
import Link from 'next/link';

export async function getStaticProps() {
  const res = await fetch(`${process.env.API_HOST}/api`);
  const api = await res.json()

  return {
    props: {
      api
    },
    revalidate: 1,
  }
}

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
