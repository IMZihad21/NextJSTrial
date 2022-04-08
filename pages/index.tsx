import { Box } from '@mui/material'
import axios from 'axios'
import type { NextPage } from 'next'

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.NEXT_URL}/api`);
  return {
    props: { data },
    // revalidate: 1, // In seconds
  }
}

interface Props {
  data: {
    message: string
  }
}

const Home: NextPage<Props> = ({ data }) => {
  return (
    <Box >
      <Box>
        {data.message}
      </Box>
    </Box>
  )
}

export default Home
