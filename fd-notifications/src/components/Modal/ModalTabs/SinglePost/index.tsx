import React, {useRef, useEffect, useState, FC} from 'react';
import moment from 'moment';
import Button from '@mui/material/Button';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useAppSelector, useAppDispatch} from '../../../../store/hooks';
import {
    selectReadPost,
    setPostReaded,
    clearSinglePost,
    selectSinglePostSlug
} from '../../../../store/appSlice';
import {fetchPosts} from '../../../../store/postsSlice';
import useStyles from '../../../styles';
import colors from "../../../../../../../../colors";

const SinglePost: FC = () => {
    const classes = useStyles();

    const dispatch = useAppDispatch();

    const [disableBtn, setDisableBtn] = useState(true);
    const postContentRef = useRef();

    const {ID, post_title, post_date, post_content} = useAppSelector(selectReadPost);
    const slug = useAppSelector(selectSinglePostSlug);

    const onScroll = () => {
        if (postContentRef.current) {
            const {scrollTop, scrollHeight, clientHeight} = postContentRef.current;
            const height = scrollHeight - 100;
            if (scrollTop + clientHeight >= height) {
                setDisableBtn(false);
            }
        }
    };

    const clickRead = () => {
        Promise.resolve(dispatch(setPostReaded(ID, slug)))
            .then(() => dispatch(fetchPosts()))
            .then(() => dispatch(clearSinglePost()));
    }

    useEffect(() => {
        onScroll();
    }, []);

    return (
        <div>
            <h3 className={classes.margin10px}>{post_title}</h3>
            <h4 className={classes.dateFont}>{moment(post_date).format('MM.DD.YY')}</h4>
            <div dangerouslySetInnerHTML={{__html: post_content}}
                 onScroll={onScroll}
                 ref={postContentRef}
                 className={classes.postContent}
            ></div>
            <div className={classes.textCenter}>

            <Button variant="contained"
                    style={{backgroundColor: colors.color25 }}
                    startIcon={<ArrowBackIcon/>}
                    onClick={() => dispatch(clearSinglePost())}
            >
                Back
            </Button>
                <Button variant="contained"
                        color="warning"
                        startIcon={<AutoStoriesIcon/>}
                        onClick={clickRead}
                        disabled={disableBtn}
                        className={`${classes.mr10} ${classes.mr10}`}
                        style={{float: 'none', color: 'white'}}
                >
                    Acknowledge
                </Button>
            </div>
        </div>
    );
}

export default SinglePost;

