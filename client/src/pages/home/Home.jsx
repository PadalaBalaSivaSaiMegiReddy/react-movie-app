import Featured from '../../components/featured/Featured'
import List from '../../components/list/List'
import NavBar from '../../components/navbar/NavBar'
import './Home.scss'

export default function Home() {
  return (
    <div className='home'>
      <NavBar/>
      <Featured />
      <List/> 
      <List/> 
      <List/> 
      <List/> 

    </div>
  )
}
