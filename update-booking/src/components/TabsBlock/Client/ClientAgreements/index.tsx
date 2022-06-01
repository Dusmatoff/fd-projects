import React from 'react';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MailOutline from '@material-ui/icons/MailOutline';
import Delete from '@material-ui/icons/Delete';
import Link from '@material-ui/icons/Link';
import useStyles from '../../../styles';

const ClientAgreements = (props) => {
  const classes = useStyles();

  const { data, client } = props;
  const { doc_details: docDetails, doc_url: docUrl } = client;

  const sendAgreement = (e) => {
    data.setFieldValue('submitButtonType', 'send_agreement');
    data.handleSubmit(e);
  };

  const sendSignedAgreement = (e) => {
    data.setFieldValue('submitButtonType', 'send_signed_agreement');
    data.handleSubmit(e);
  };

  const deleteAgreement = (e) => {
    data.setFieldValue('submitButtonType', 'delete_agreement');
    data.handleSubmit(e);
  };

  return (
    <Paper
      className={`${classes.padding} ${classes.textCenter} ${classes.agreementPadding} ${docDetails == null && classes.noAgreement}`}
    >

      <Typography variant="body1" align="center">
        <>
          {docDetails == null ? <span className={classes.fontSize15}>No Agreement! </span>
            : (
              <a
                href={`/agreements/${docDetails.agreement}`}
                target="_blank"
                className={`${classes.green} ${classes.fontSize15} agreement-text`}
                rel="noreferrer"
              >
                Agreement Signed
                {' '}
                {moment(docDetails.last_ackowledged).format('MM/DD/YY')}
              </a>
            )}

          <br />
          <IconButton size="small" component="span" onClick={() => window.open(docUrl, '_blank')}>
            <Link />
          </IconButton>

          <IconButton size="small" component="span" onClick={docDetails == null ? sendAgreement : sendSignedAgreement}>
            <MailOutline />
          </IconButton>

          {client.current_user_can_delete && docDetails
                    && (
                    <IconButton color="secondary" size="small" component="span" onClick={deleteAgreement}>
                      <Delete />
                    </IconButton>
                    )}
        </>
      </Typography>
    </Paper>
  );
};

export default ClientAgreements;
