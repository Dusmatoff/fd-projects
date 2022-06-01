import React, {FC, useState, useEffect} from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import PostsList from '../PostsList';
import SinglePost from '../SinglePost';
import {useAppSelector} from '../../../../store/hooks';
import {selectReadPost} from '../../../../store/appSlice';
import {selectDocsCategories, selectDocs} from '../../../../store/postsSlice';

const DocsTab: FC = () => {
    const docsCategories = useAppSelector(selectDocsCategories);
    const readPost = useAppSelector(selectReadPost);
    const docs = useAppSelector(selectDocs);
    let menuIndex = 0;

    for (const item in docsCategories) {
        if (docsCategories[item].unread_count > 0) {
            menuIndex = docsCategories[item].term_id;
            break;
        }
    }

    if (menuIndex === 0) {
        const firstKey = Object.keys(docsCategories)[0];
        menuIndex = docsCategories[firstKey].term_id;
    }

    const [selectedMenu, setSelectedMenu] = useState(menuIndex);
    const [posts, setPosts] = useState(docs[selectedMenu]);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedMenu(index);
        setPosts(docs[index]);
    };

    useEffect(() => {
        setPosts(docs[menuIndex]);
    }, [docs]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <Box sx={{bgcolor: '#F7F7F7'}}>
                    <List component="nav">
                        {Object.keys(docsCategories).map((id) => {
                            const {term_id, name, unread_count} = docsCategories[id];
                            const count = unread_count > 0 ? `(${unread_count})` : '';

                            return (
                                <ListItemButton
                                    selected={selectedMenu === term_id}
                                    onClick={(event) => handleListItemClick(event, term_id)}
                                >
                                    <ListItemIcon>
                                        <FolderIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={`${name.replace(/&amp;/g, '&')} ${count}`}/>
                                </ListItemButton>
                            )
                        })}
                    </List>
                </Box>
            </Grid>
            <Grid item xs={9}>
                {readPost ? <SinglePost/> : <PostsList posts={posts} isDocs={true}/>}
            </Grid>
        </Grid>
    );
}

export default DocsTab;
