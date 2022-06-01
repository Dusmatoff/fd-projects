import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => createStyles({
    icon: {
        position: 'fixed',
        zIndex: 99999,
        cursor: 'pointer',
        //maxWidth: '100px',
        bottom: 32,
        right: 40,
    },
    badgeContent: {
        backgroundColor: '#ca4a1f',
        color: 'white',
    },
    modalRoot: {
        zIndex: '999999 !important',
        '& .MuiDialog-paper': {
            minHeight: '500px',
            maxHeight: 'none',
            height: '95vh',
        },
        '& .MuiTableCell-root.MuiTableCell-body.MuiTableCell-sizeMedium': {
            padding: '6px',
            fontSize: '1.1rem',
            '@media (max-width:490px)': {
                padding: '3px',
                fontSize: '0.9rem',
            },
        },
        '& .MuiButton-containedSecondary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButtonBase-root': {
            float: 'right',
            '@media (max-width:490px)': {
                padding: '3px',
                margin: '2px',
                lineHeight: '1',
            },
        },
        '& .MuiButton-containedInfo.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButtonBase-root': {
            float: 'right',
            '@media (max-width:490px)': {
                padding: '3px',
                margin: '2px',
                lineHeight: '1',
            },
        },
        '& .MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButtonBase-root': {
            '@media (max-width:490px)': {
                padding: '3px',
                margin: '2px',
                lineHeight: '1',
            },
        },
        '& .MuiButtonBase-root.MuiTab-root.MuiTab-labelIcon.MuiTab-textColorInherit.MuiTab-fullWidth': {
            '@media (max-width:490px)': {
                fontSize: '0.7rem',
                minHeight: '20px',
            },
        },
        '& .MuiButton-startIcon.MuiButton-iconSizeMedium': {
            '@media (max-width:490px)': {
                marginLeft: '-2px',
                marginRight: '3px',
            },
        },
        '& .MuiTypography-root.MuiTypography-h5': {
            '@media (max-width:490px)': {
                fontSize: '1.1rem',
            },
        },
        '& .notifications-makeStyles-closeButton-4': {
            '@media (max-width:490px)': {
                top: '10px',
                right: '10px',
            },
        },
        '& .MuiTypography-root.MuiTypography-h6.MuiDialogTitle-root.notifications-makeStyles-modalTitle-3': {
            '@media (max-width:767px)': {
                padding: '5px',
            },
        },
        '& .MuiDialogContent-root': {
            '@media (max-width:767px)': {
                padding: '0px 0px 5px 0px',
            },
        },
        '& .MuiTabs-flexContainer': {
            '@media (max-width:490px)': {
                height: '46px',
            },
        },
        '& .MuiBox-root': {
            '@media (max-width:490px)': {
                padding: '10px',
            },
            '@media (max-width:768px)': {
                backgroundColor: 'transparent',
                display:'contents',
            },
        },
        '& .MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-2': {
            '@media (max-width:768px)': {
                display: 'flex',
                flexDirection: 'column',
            },
        },
        '& .MuiList-root.MuiList-padding': {
            '@media (max-width:768px)': {
                display: 'flex',
                justifyContent: 'space-around',
            },
        },
        '& .MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-9': {
            '@media (max-width:768px)': {
                maxWidth: '100%',
            },
        },
        '& .MuiListItemButton-root.MuiListItemButton-gutters.Mui-selected.MuiButtonBase-root': {
            '@media (max-width:768px)': {
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'flex-start',
                alignItems: 'flex-start',
                justifyItems: 'center',
                paddingLeft: '0',
                paddingRight: '0',
                margin: '3px',
            },
        },
        '& .MuiListItemButton-root.MuiListItemButton-gutters.MuiButtonBase-root': {
            '@media (max-width:768px)': {
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'flex-start',
                alignItems: 'flex-start',
                justifyItems: 'center',
                paddingLeft: '0',
                paddingRight: '0',
                margin: '3px',
            },
        },
        '& .MuiTypography-root.MuiTypography-body1.MuiListItemText-primary': {
            '@media (max-width:768px)': {
                fontSize: '0.9rem',
            },
        },
        '& .MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-3': {
            '@media (max-width:768px)': {
                paddingTop: '0px',
                maxWidth: '100%',
            },
        },

        '& .MuiButton-root.MuiButton-contained.MuiButton-containedSecondary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButtonBase-root.notifications-makeStyles-mr10-7': {
            float: 'none',
        },
        '& .MuiButton-root.MuiButton-contained.MuiButton-containedSecondary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButtonBase-root.notifications-notifications-jss7': {
            float: 'none',
        },
        '& .MuiButton-root.MuiButton-contained.MuiButton-containedSecondary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButtonBase-root.notifications-makeStyles-mr10-8': {
            float: 'none',
        },
        '& .MuiButton-root.MuiButton-contained.MuiButton-containedSecondary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButtonBase-root.notifications-notifications-jss8': {
            float: 'none',
        }
    },
    modalTitle: {
        margin: 0,
        padding: '5px 24px!important',
    },
    minHeight: {
        paddingBottom: '0px!important',
        '@media (min-width:769px)': {
            minHeight: '600px',
        },
    },
    closeButton: {
        position: 'absolute',
        right: 20,
        top: 20,
        color: 'grey',
        cursor: 'pointer',
        '@media (max-width:490px)': {
            top: '10px',
            right: '10px',
        },
    },
    postContent: {
        height: '61vh',
        marginBottom: 10,
        overflowY: 'auto',
        display: 'flex',
        justifyContent: 'center',
        '@media (max-width:768px)': {
            height: '56vh',
        },
    },
    boldText: {
        fontWeight: 'bold!important',
    },
    mr10: {
        marginLeft: '10px!important',
        float: 'none',
    },
    dateFont: {
        fontSize: '0.8rem',
        color: 'grey',
        margin: '10px auto',
    },
    textCenter: {
        textAlign: 'center',
    },
    margin10px:{
        margin: '10px auto',
    },
    backgroundHeader: {
        backgroundColor: '#e6f3ff',
        color: '#153244',
    },

}));

export default useStyles;
