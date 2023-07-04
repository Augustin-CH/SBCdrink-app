import React, { type FC } from 'react'
import { Box, Card, Grid, Typography, CardMedia } from '@mui/material'
import { type ICardData } from '@/features/ui/card/types'
import { TextNeon } from '@/features/ui/components/TextNeon/TextNeon'

interface BlogPostCardProps {
  data: ICardData
  index: number
  onClick: () => void
}

const BlogPostCard: FC<BlogPostCardProps> = ({ data, index, onClick }) => {
  const { cover, title, subTitle, description } = data

  return (
    <Grid item xs={12} sm={12} md={6} key={`card_${index}`} onClick={onClick}>
      <Card sx={{ display: 'flex', height: 230, padding: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 120 }}>
          <CardMedia
              component="img"
              sx={{ height: 200, marginLeft: 'auto', marginRight: 'auto', width: 'auto' }}
              image={cover}
              alt="Live from space album cover"
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component="div" variant="h5" paddingBottom={1}>
            <TextNeon text={title?.toUpperCase() ?? ''} type={1} style={{ fontSize: 25 }} />
          </Typography>
          <Typography component="div" variant="subtitle1" paddingBottom={1}>
            {subTitle}
          </Typography>
          <Typography component="div">
            {description}
          </Typography>
        </Box>
      </Card>
    </Grid>
  )
}

export default BlogPostCard
