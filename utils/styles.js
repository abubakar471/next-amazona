import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    navbar: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        padding: '0 30px',
    },
    main: {
        minHeight: '50vh'
    },
    footer : {
        textAlign : 'center'
    }
});

export default useStyles