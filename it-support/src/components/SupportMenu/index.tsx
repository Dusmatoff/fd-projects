import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showNewRequest, showList } from '../../store/actions/app';
import { getUpdates } from '../../store/selectors';
import CustomerIcon from '../Icons/customer.png';
import useStyles from '../styles';

const SupportMenu = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const updates = useSelector((state) => getUpdates(state));

  const handleResize = () => setIsMobile(window.innerWidth < 768);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  });

  return (
    <div className="support-menu">
      <div className="support-menu_btn">
        <img src={CustomerIcon} style={{ height: 24, marginRight: 5 }} />
        {!isMobile && 'IT Support'}
        {' '}
        <span className={classes.updateCounter}>{updates.count > 0 && `${updates.count} ${!isMobile ? 'updates' : ''}`}</span>
      </div>
      <div className="support-menu_items">
        <a href="#" onClick={() => dispatch(showNewRequest())}>New request</a>
        <a href="#" onClick={() => dispatch(showList())}>List</a>
      </div>
    </div>
  );
};

export default SupportMenu;
