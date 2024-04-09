import Featured from '../../components/featured/Featured'
import NavBar from '../../components/navbar/NavBar'
import './Home.scss'

export default function Home() {
  return (
    <div className='home'>
      <NavBar/>
      <Featured type="movie"/>
    </div>
  )
}
