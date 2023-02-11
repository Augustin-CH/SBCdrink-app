
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
import {BlogPostCard, BlogPostsSearch, BlogPostsSort} from '@/features/ui/blog';

// mock
import COCKTAILS from '../_mock/cocktails';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
    { value: 'latest', label: 'Latest' },
    { value: 'popular', label: 'Popular' },
    { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function BlogPage() {
    return (
        <>
            <Container sx={{ paddingTop: "15px"}}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Cocktail
                    </Typography>
                </Stack>

                <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
                    <BlogPostsSearch posts={COCKTAILS} />
                    <BlogPostsSort options={SORT_OPTIONS} />
                </Stack>

                <Grid container spacing={3} mb={5}>
                    {COCKTAILS.map((post, index) => (
                        <BlogPostCard key={post.id} post={post} index={index} />
                    ))}
                </Grid>
                <Stack direction="row" alignItems="center" justifyContent="flex-end" mb={5}>
                    <Button variant="contained">
                        Manage
                    </Button>
                </Stack>
            </Container>
        </>
    );
}