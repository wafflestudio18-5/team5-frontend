import { Header } from '../../Components';

function HeaderPage({user_data, history}) {
  const display_data = {
    name: user_data.name,
    // TODO 프사
  }
  return (
    <Header user_data={display_data} history={history}/> 
  )
}

export default HeaderPage;