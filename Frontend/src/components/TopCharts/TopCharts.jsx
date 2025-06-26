import React from 'react'
import SongSlider from '../SongSlider/SongSlider'

const Charts = [
{
  title : 'Saga' , artist:'' , image : 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
},
]

const TopCharts = () => {
  return (
    <div>
      <SongSlider title='Top Charts' songs={Charts} ></SongSlider>
    </div>
  )
}

export default TopCharts