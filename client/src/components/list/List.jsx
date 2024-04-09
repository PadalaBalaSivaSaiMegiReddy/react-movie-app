import './List.scss';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ListItem from '../listItem/ListItem';
import { useRef } from 'react';

export default function List() {
  

  const listRef = useRef();

  const handleClick=(direction)=>{
    

    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left") {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === "right" ) {
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  }
  return (
    <div className='list'>
        <span className="listTitle">
            Continue to Watch
        </span>
        <div className="wrapper">
            <ArrowBackIosIcon className='sliderArrow left' ref={listRef} onClick={()=>handleClick("left")}/>
            <div className="container">
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
                <ListItem/>
            </div>
            <ArrowForwardIosIcon className='sliderArrow right'  onClick={()=>handleClick("right")}/>
        </div>
    </div>
  )
}
