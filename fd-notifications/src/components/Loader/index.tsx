import React, {FC} from 'react';
import Backdrop from '@mui/material/Backdrop';
import FdLoader from './flip.gif';
import {useAppSelector} from '../../store/hooks';
import {selectLoading} from '../../store/appSlice';

const Loader: FC = () => {
    const showLoader = useAppSelector(selectLoading);

    return (
        <Backdrop open={showLoader}>
            <img src={FdLoader} alt="FDPhotoStudio loader"/>
        </Backdrop>
    );
};

export default Loader;
