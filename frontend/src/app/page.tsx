import FeaturesSection from '@/components/Home/Features'
import FeedPromo from '@/components/Home/FeedPromo'
import GetStarted from '@/components/Home/GetStarted'
import Home from '@/components/Home/Home'
import React from 'react'

const page = () => {
  return (
    <>
      <Home />
      <FeaturesSection />
      <GetStarted />
      <FeedPromo />
    </>
  )
}

export default page