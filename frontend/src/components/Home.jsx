import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from '@/components/HeroSection'
import CategoryCaraousel from './CategoryCaraousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import RegisterPopup from './RegisterPopup'

export const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  console.log(user?._id);
  useEffect(() => {
    if (!user?._id) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 5000)
      return (() => clearTimeout(timer));
    }
  }, [user]);
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies")
    }
  }, [])


  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCaraousel />
      <LatestJobs />
      {showPopup && <RegisterPopup onClose={(() => setShowPopup(false))} />}
      <Footer />
    </div>
  )
}
