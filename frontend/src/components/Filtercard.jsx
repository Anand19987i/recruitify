import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Chennai", "Kolkata", "Jaipur", "Ahmedabad"]
    },
    {
        fitlerType: "Industry",
        array: [
            "Frontend Developer", 
            "Backend Developer", 
            "FullStack Developer", 
            "Data Scientist", 
            "DevOps Engineer", 
            "UI/UX Designer", 
            "AI/ML Engineer", 
            "QA Tester"
        ]
    },
    {
        fitlerType: "Salary",
        array: ["2 LPA - 10 LPA", "12 LPA - 22 LPA", "15 LPA - 45 LPA", "32 LPA - 60 LPA", "60 LPA and above"]
    },
    {
        fitlerType: "Job Type",
        array: ["Full-Time", "Part-Time", "Contract", "Internship", "Remote", "Freelance"]
    },
    {
        fitlerType: "Experience Level",
        array: ["Fresher", "1-3 Years", "4-6 Years", "7-10 Years", "10+ Years"]
    },
    {
        fitlerType: "Skills",
        array: [
            "JavaScript", 
            "Python", 
            "Java", 
            "AWS", 
            "React", 
            "Node.js", 
            "Kubernetes", 
            "SQL", 
            "Docker"
        ]
    },   
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);
    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    fitlerData.map((data, index) => (
                        <div key={index}>
                            <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div key={idx} className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard