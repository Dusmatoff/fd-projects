import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import Save from '@material-ui/icons/Save';
import ClientTabs from './ClientTabs';
import ClientNotes from './ClientNotes';
import ClientContacts from './ClientContacts';
import ClientRatings from './ClientRatings';
import ClientStatistics from './ClientStatistics';
import { getClient } from '../../../selectors';
import {
  fetchClient,
  saveClientSocials,
  sendAgreement,
  sendSignedAgreement,
  uploadPhoto,
  updateClient,
  deleteAgreement,
  deletePhoto,
} from '../../../actions/client';
import { BlueButton } from '../../buttons';
import { errorMessages } from '../../../utils';
import useStyles from '../../styles';

const Client = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const client = useSelector((state) => getClient(state));

  const bookingId = client.app_id;

  /* FORMIK */
  Yup.addMethod(Yup.string, 'phoneValidation', function (phone) {
    return this.test('test-phone', phone, (value) => {
      if (value) {
        const phoneFormatted = value.match(/\d/g).join('');

        return phoneFormatted.length === 10;
      }

      return true;
    });
  });

  const socialValidationText = 'Please provide only USERNAME from social link https://www.SOCIAL_NETWORK/USERNAME';

  const validationSchema = Yup.object({
    name: Yup.string().trim().matches(/[a-z A-Z]/i, errorMessages.name).min(3)
      .max(100)
      .required(),
    name2: Yup.string().trim().matches(/[a-z A-Z]/i, errorMessages.name).min(3)
      .max(100)
      .nullable(),
    name3: Yup.string().trim().matches(/[a-z A-Z]/i, errorMessages.name).min(3)
      .max(100)
      .nullable(),
    email: Yup.string().matches(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm, errorMessages.email).max(320).required(),
    email2: Yup.string().matches(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm, errorMessages.email).max(320).nullable(),
    email3: Yup.string().matches(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm, errorMessages.email).max(320).nullable(),
    phone: Yup.string().phoneValidation(errorMessages.phone).required(),
    phone2: Yup.string().phoneValidation(errorMessages.phone).nullable(),
    phone3: Yup.string().phoneValidation(errorMessages.phone).nullable(),
    facebook: Yup.string().matches(/^[0-9a-zA-Z\.]{6,50}$/g, socialValidationText).nullable(),
    youtube: Yup.string().matches(/^[0-9a-zA-Z_]{1,30}$/g, socialValidationText).nullable(),
    twitter: Yup.string().matches(/^[0-9a-zA-Z_]{1,15}$/g, socialValidationText).nullable(),
    instagram: Yup.string().matches(/^[0-9a-zA-Z_\.]{3,30}$/g, socialValidationText).nullable(),
    snapchat: Yup.string().matches(/^[0-9a-zA-Z_\.-]{3,15}$/g, socialValidationText).nullable(),
    negativeSum: Yup.number().when('negativeBalance', {
      is: (negativeBalance) => negativeBalance === true,
      then: Yup.number().min(0.02).required(errorMessages.sum),
    }),
  });

  const initialValues = {
    id: client.id,
    base64: client.base64,
    appId: bookingId,
    photo: client.photo ? `/photo/${client.photo}` : '/wp-content/plugins/appointment-calendar/update-booking/avatar.png',
    selectedPhoto: null,
    name: client.name,
    name2: client.names.length != 0 ? client.names[0]?.meta_value : null,
    name2MetaId: client.names.length != 0 ? client.names[0]?.umeta_id : null,
    name3: client.names.length != 0 ? client.names[1]?.meta_value : null,
    name3MetaId: client.names.length != 0 ? client.names[1]?.umeta_id : null,
    email: client.email,
    email2: client.email_2,
    email3: client.email_3,
    phone: client.phone,
    phone2: client.phone_2,
    phone3: client.phone_3,
    birthday: client.birthday,
    facebook: client.socials.facebook ? client.socials.facebook : null,
    youtube: client.socials.youtube ? client.socials.youtube : null,
    twitter: client.socials.twitter ? client.socials.twitter : null,
    instagram: client.socials.instagram ? client.socials.instagram : null,
    snapchat: client.socials.snapchat ? client.socials.snapchat : null,
    deposit100: Boolean(+client.deposit100),
    blacklist: Boolean(+client.blacklist),
    blacklistReason: client.blacklist_reason ? client.blacklist_reason.reason : '',
    negativeBalance: client.negative_balance.length != 0,
    negativeSum: client.negative_balance.length != 0 ? client.negative_sum : '',
    negativeReason: client.negative_balance.length != 0 ? client.negative_reason : '',
    negativeDate: client.negative_balance.length != 0 ? client.negative_date : new Date(),
    negativeBy: client.negative_by,
    submitButtonType: '',
  };
  /* FORMIK */

  return (
    <div className={`${classes.clientBorder} ${classes.pd7}`}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          switch (values.submitButtonType) {
            case 'save_socials':
              dispatch(saveClientSocials(values));
              break;
            case 'send_agreement':
              dispatch(sendAgreement(values));
              break;
            case 'send_signed_agreement':
              dispatch(sendSignedAgreement(values));
              break;
            case 'delete_agreement':
              if (window.confirm('Do you want delete agreement?')) {
                Promise.resolve(dispatch(deleteAgreement(values.id)))
                  .then(() => {
                    dispatch(fetchClient(values.id, bookingId));
                  });
              }
              break;
            case 'upload_photo':
              dispatch(uploadPhoto(values));
              break;
            case 'delete_photo':
              Promise.resolve(dispatch(deletePhoto(values.id)))
                .then(() => {
                  dispatch(fetchClient(values.id, bookingId));
                });
              break;
            default:
              Promise.resolve(dispatch(updateClient(values)))
                .then(() => {
                  dispatch(fetchClient(values.id, bookingId));
                });
              break;
          }

          actions.setFieldValue('submitButtonType', '');
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Grid container spacing={1}>
              <ClientContacts data={props} hasPhoto={client.photo} />
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={4} xl={3} className={classes.textCenter}>
                <ClientRatings client={client} />
                <br />
                <BlueButton variant="contained" size="large" type="submit" endIcon={<Save />}>
                  Save client
                </BlueButton>
              </Grid>
              <Grid item xs={8} xl={9}>
                <ClientStatistics data={props} client={client} />
                <br />
                <ClientNotes />
              </Grid>
            </Grid>
            <ClientTabs data={props} client={client} />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Client;
