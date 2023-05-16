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

> ok here we hit a problem that after a give a windows setup, and then came to run this 
    project again , i have encountered this problem , that was saying client has to connected first. so to solve this issue i just had to seed product and users data to the database and that solved this problem.
    to seed data goto your browser and hit these two routes one after another
    http://localhost:3000/api/seed (this is for the products data to seed)
    http://localhost:3000/api/userSeed (this is for the users data to seed)


# Log in 

here i have used react-hook-form for client side form validation

yarn add react-hook-form 

and see the other documentaion from their site to get to know how to use it.

we have used next-auth a package for next js , that handles authentication for us.

# user menu 

we are using headless ui for the dropdown and user menu in header in our app.

yarn add @headlessui/react

