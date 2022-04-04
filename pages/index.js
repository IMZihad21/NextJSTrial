import { Box, Typography } from '@mui/material'
import Link from 'next/link';

export async function getServerSideProps(context) {
  const api = {
    message: "Working!"
  }

  return {
    props: {
      api
    }
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
