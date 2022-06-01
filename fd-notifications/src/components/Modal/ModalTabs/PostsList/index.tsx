import React, {FC, useRef} from 'react';
import moment from 'moment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import {useAppDispatch} from '../../../../store/hooks';
import {fetchSinglePost, setSinglePostSlug} from '../../../../store/appSlice';
import {IPostsList} from '../../../../store/interfaces';
import useStyles from '../../../styles';
import colors from '../../../../../../../../colors';

const PostsList: FC<IPostsList> = ({posts, isDocs}) => {
    const classes = useStyles();

    const dispatch = useAppDispatch();

    const [page, setPage] = React.useState(0);
    const rowsPerPage = 10;

    const paperRef = useRef(null);

    const handleChangePage = (event, newPage: number) => {
        setPage(newPage);
        event.preventDefault();
        paperRef.current.scrollIntoView();
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - posts.length) : 0;

    const readClick = (postId: number, slug: string) => {
        dispatch(fetchSinglePost(postId));
        const slugValue = isDocs ? 'docs' : slug;
        dispatch(setSinglePostSlug(slugValue));
    }

    return (
        <Paper sx={{width: '100%', mb: 2}} ref={paperRef} id="postlist-paper">
            <TableContainer>
                <Table sx={{minWidth: 200}} size="medium">
                    <TableBody>
                        {posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((post) => {
                                return (
                                    <TableRow key={post.ID}>
                                        <TableCell className={!post.readed && classes.boldText}>
                                            {moment(post.post_date).format('MM.DD.YY')}
                                        </TableCell>
                                        <TableCell className={!post.readed && classes.boldText}>
                                            {post.post_title}
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="contained"
                                                    style={{backgroundColor: post.readed ? colors.color27 : colors.color25 }}
                                                    startIcon={<AutoStoriesIcon/>}
                                                    onClick={() => readClick(post.ID, post.slug)}
                                            >
                                                Read
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow style={{height: 53 * emptyRows}}><TableCell colSpan={6}/></TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={posts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[]}
            />
        </Paper>
    );
}

export default PostsList;
