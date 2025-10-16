import { Link } from 'react-router-dom';

function Header(){
    return(
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className='container-fluid'>
                <Link className='navbar-brand' to='/'>Home</Link>
                <Link className='navbar-brand' to='/productos'>Productos</Link>
                <Link className='navbar-brand' to='/blog'>Blog</Link>
                <Link className='navbar-brand' to='/contacto'>Contacto</Link>
                <Link className='navbar-brand' to='/about'>About</Link>
            </div>
        </nav>
    )
}

export default Header;