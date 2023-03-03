import React, { type FC } from 'react'
// @mui
import { styled } from '@mui/material/styles'
import { Box, Card, Grid, Avatar, Typography, CardContent } from '@mui/material'
// utils
import { fDate } from '@/features/ui/utils/formatTime'
import { fShortenNumber } from '@/features/ui/utils/formatNumber'
import SvgColor from '@/features/ui/components/svg-color'

import VisibilityIcon from '@mui/icons-material/Visibility'
import ChatIcon from '@mui/icons-material/Chat'
import ShareIcon from '@mui/icons-material/Share'
import { type ICardData } from '@/features/ui/card/types'

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
})

const StyledTitle = styled('h4')({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  margin: '0 0 0 0'
})

const StyledDescription = styled('p')({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  margin: '0 0 0 0'
})

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2)
}))

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled
}))

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
})

interface BlogPostCardProps {
  data: ICardData
  index: number
  onClick: () => void
}

const BlogPostCard: FC<BlogPostCardProps> = ({ data, index, onClick }) => {
  const { cover, title, description, view, comment, share, author, createdAt } = data

  const POST_INFO = [
    { number: comment, icon: <ChatIcon sx={{ marginRight: '5px', marginLeft: '5px' }} /> },
    { number: view, icon: <VisibilityIcon sx={{ marginRight: '5px', marginLeft: '5px' }} /> },
    { number: share, icon: <ShareIcon sx={{ marginRight: '5px', marginLeft: '5px' }} /> }
  ]

  return (
    <Grid item xs={6} sm={6} md={3} key={`card_${index}`} onClick={onClick}>
      <Card sx={{ position: 'relative' }}>
        <StyledCardMedia>
            {(author != null) && (
                <>
                     <SvgColor
                        src="/assets/icons/shape-avatar.svg"
                     />

                    <StyledAvatar
                        alt={author.name}
                        src={author.avatarUrl}
                    />
                </>

            )}
          <StyledCover alt={title} src={cover} />
        </StyledCardMedia>

        <CardContent>
          {(createdAt != null) && (
              <Typography gutterBottom variant="caption">
                {fDate(createdAt)}
              </Typography>
          )}

          {(title != null) && (
              <StyledTitle
                  color="inherit"
              >
                {title}
              </StyledTitle>
          )}

          {(description != null) && (
              <StyledDescription
                  color="inherit"
              >
                {description}
              </StyledDescription>
          )}

          { ((view != null) || (comment != null) || (share != null)) && (
              <StyledInfo>
                {POST_INFO.map((info, index) => {
                  const number = fShortenNumber(info.number)
                  return (Boolean(number.length)) && (
                      <Box key={index}>
                        {info.icon}
                        <Typography variant="caption">{number}</Typography>
                      </Box>
                  )
                })}
              </StyledInfo>
          )}

        </CardContent>
      </Card>
    </Grid>
  )
}

export default BlogPostCard
