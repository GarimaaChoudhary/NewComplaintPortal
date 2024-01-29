import React from 'react'

import { Button, Card, CardContent, styled, Typography } from '@mui/material'



const TriangleImg =styled("img")({
    right:0,
    bottom:0,
    height:170,
    position:"absolute"
})

const TrophyImg=styled("img")({
    right:36,
    bottom:20,
    height:98,
    position:'absolute'
})

const Achievement = () => {
  return (
    <Card  className=''sx={{position:"relative"}}>
       {/* <CardContent>
      <Typography variant='h6' sx={{letterSpacing:".25px"}}>
        Shop with garu
      </Typography>
      <Typography variant='body2'> Congratulations  </Typography>
      <Typography variant='h5' sx={{my:3.1}}>420.8k</Typography>
      <Button size='small' variant='contained' >View Sales</Button>
     
      <TriangleImg src=''></TriangleImg>
      https://www.manufacturingtodayindia.com/cloud/2021/11/17/5lBNpt4l-MT---Story-6---IOCL.gif
      <TrophyImg src='https://t3.ftcdn.net/jpg/03/06/75/94/240_F_306759459_K1KWp8Re6RgHfSjJxYqFfe8amzTGHRfR.jpg'></TrophyImg>
  </CardContent>*/}
  <img src="https://images.moneycontrol.com/static-mcnews/2021/09/Indian-Oil-Corporation.jpg?impolicy=website&width=1600&height=900"
  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
  alt="Card Image"></img>
    </Card>
  )
}

export default Achievement

