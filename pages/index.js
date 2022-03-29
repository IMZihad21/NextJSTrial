import { Box, Typography } from '@mui/material'
import useSWR from 'swr'

export default function Home() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR('/api/', fetcher);
  return (
    <Box>
      <Typography>
        {error ? "Failed" : data?.message}
      </Typography>
    </Box>
  )
}