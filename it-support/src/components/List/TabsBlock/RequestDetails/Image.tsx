import * as React from 'react';
import { Dialog } from '@material-ui/core';
import {paddingBottom} from "html2canvas/dist/types/css/property-descriptors/padding";

export default function Image({ src }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <img src={src} style={{ width: 200, paddingBottom: '10px', cursor: 'pointer' }} onClick={handleClickOpen} />
      <Dialog
        maxWidth="md"
        open={open}
        onClose={handleClose}
        fullWidth
      >
        <img src={src} onClick={handleClickOpen} />
      </Dialog>
    </>
  );
}
