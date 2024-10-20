import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from '@/components/HeroSection'
import CategoryCaraousel from './CategoryCaraousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

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
      <Footer />
    </div>
  )
}
