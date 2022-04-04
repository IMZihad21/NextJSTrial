import { Box, Typography } from '@mui/material'
import Link from 'next/link';
import { getJWTtoken } from '../utils/auth';

export async function getServerSideProps(context) {
  const token = getJWTtoken(context.req)

  const api = {
    message: "Working!"
  }

  return {
    props: {
      api, token
    }
  }
}

export default function Home({ api, token }) {
  console.log(token)
  return (
    <Box>
      <Typography>
        {api?.message}
      </Typography>
      <Link href='/blog'>Blogs</Link>
    </Box>
  )
}
