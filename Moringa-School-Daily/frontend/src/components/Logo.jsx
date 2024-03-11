import { Link } from 'react-router-dom'
import defaultLogo from '../assets/Logo.svg'
export default function Logo(){
    return(
        <Link to='/'>
            <img src={defaultLogo} alt='moringa-daily-logo'/>
        </Link>
    )
}