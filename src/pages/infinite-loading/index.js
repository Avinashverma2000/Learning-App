import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography'
import { Button, Card, CardContent } from '@mui/material'

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center',
    padding: '40px 40px',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
})
// data sample
// [
// {
//   "userId": 1,
//   "id": 9,
//   "title": "nesciunt iure omnis dolorem tempora et accusantium",
//   "body": "consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas"
// }
// ]

function InfiniteLoading() {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  async function fetchData() {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=9&_page=${page}`,
    )
    const resData = await res.json()
    const upData = [...data, ...resData]
    setData(upData);
    setLoading(false);
  }
  function handleScrollEvent() {
    try {
      setLoading(true);
      if (
        document.documentElement.scrollTop + window.innerHeight + 2 >
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1)
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [page])

  useEffect(() => {
    window.addEventListener('scroll', handleScrollEvent)
    return () => window.removeEventListener('scroll', handleScrollEvent)
  }, [])
  const classes = useStyles()
  return (
    <Box className={classes.container}>
      <h2>Infinite Loading</h2>
      <Stack
        direction={{ xs: 'row', sm: 'row' }}
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          flexWrap: 'wrap',
        }}
      >
        {data?.length > 0 &&
          data?.map((product) => {
            return (
              <Card
                key={product.id}
                style={{ width: '30%', marginTop: '10px' }}
              >
                <CardContent style={{ overflow: 'scroll', height: '200px' }}>
                  <Typography variant="h6">{product.title}</Typography>
                  <Typography variant="body2">{product.body}</Typography>
                  {/* <Typography variant="h5">${product.price}</Typography> */}
                </CardContent>
              </Card>
            )
          })}
      </Stack>
      {loading && <CircularProgress /> }
    </Box>
  )
}

export default InfiniteLoading
