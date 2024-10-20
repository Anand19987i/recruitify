import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const CategoryCaraousel = () => {
    const category = [
        "Frontend Developer",
        "Backend Developer",
        "FullStack Developer",
        "Data Scientist",
        "MERN Stack Developer",
        "Graphic Designer",
        "Software Developer",
        "DevOps Engineer",
        "Mobile App Developer",
        "Cybersecurity Specialist",
        "Cloud Architect",
        "AI/ML Engineer",
        "UI/UX Designer",
        "Database Administrator",
        "Network Engineer",
        "Blockchain Developer",
        "Game Developer",
        "Product Manager",
        "Technical Writer",
        "QA Engineer",
        "Systems Analyst"
    ];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    
    return (
        
        <div>
            <Carousel className='w-full max-w-xl mx-auto my-2'>
                <CarouselContent className='flex justify-evenly'> {
                    category.map((cat, index) => (
                        <CarouselItem key={index} className='basis-1/2 md:basis-1/2 lg:basis-1/3 flex justify-evenly'>
                            <Button onClick={() => searchJobHandler(cat)} variant="outline" className='hover:bg-gray-300 rounded-full'>{cat}</Button>
                        </CarouselItem>
                    ))
                }
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
        </div>
    )
}

export default CategoryCaraousel
