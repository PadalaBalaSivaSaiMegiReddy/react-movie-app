import NavBar from '../../components/navbar/NavBar'
import './Home.scss'

export default function Home() {
  return (
    <div className='home'>
      <NavBar/>
      <img width="100%"
            src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt="profile-img"
          />
    </div>
  )
}
