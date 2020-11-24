import './Header.css';

function Header(props) {
  return (
    <header className="logged_header">
      {props.user_data.name}
    </header>
  )
}

export default Header;