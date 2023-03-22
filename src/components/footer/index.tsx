import { Typography } from "@material-ui/core";
import {Link} from "@material-ui/core";
import './footer.scss';


function Copyright() {
    return (
      <Typography variant="body2" align="center">
        {'Copyright © '}
        <Link href="#">
          Movie Catalog
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

function Footer() {
    return (
        <footer className='footer'>
            <Copyright/>
        </footer >
    )
}

export default Footer;