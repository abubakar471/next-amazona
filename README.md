# Amazon clone using next js 


# Error Notes:

> when added the grid classname even after adding tailwind it didn't work
    for the first time, so i simply remove all the className attribute
    and wrote that attribute simply again and that time it worked.

> when added useStyles hook for material ui it didnt work as it's import
    format has been changed , we have to install @mui/styles first than 
    have to import it from it like this,

    yarn add @mui/styles

    after installing this go to utils dir from this project folder and 
    there import it like

    import { makeStyles } from '@mui/styles';

    now we can use it,

    again it first time didn't work, so i removed all the code again and
    simply written all the code just as before and it worked.
