import { Job } from "../models/job.model.js";

// Admin posting a job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId, userId } = req.body;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId || !userId) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "Job posted successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.error("Error posting job:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};


// Get all jobs for students
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };

        const jobs = await Job.find(query)
            .populate("company")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

// Get job by ID for students
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId)
            .populate("applications")
            .populate("company");

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.error("Error fetching job by ID:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};
export const getAdminJobs = async (req, res) => {
    try {
        // Assuming user is authenticated and the user ID is attached to req.user (e.g., via a middleware)
        const { userId } = req.body;  // Use req.body to extract userId
        if (!userId) {
            return res.status(400).json({
                message: "User ID is required.",
                success: false
            });
        }

        // Fetch jobs posted by the admin (created_by field) and populate company information
        const jobs = await Job.find({ created_by: userId })
            .populate("company")  // Populating company details
            .sort({ createdAt: -1 }); // Sorting by creation date in descending order

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.error("Error fetching admin jobs:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

export const updateJob = async (req, res) => {
    try {
        console.log("Update Job ID:", req.params.id); // Log job ID
        console.log("Request Body:", req.body); // Log request body

        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;

        // Validate required fields
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            });
        }

        // If requirements is a string, convert it to an array (if needed)
        const requirementsArray = Array.isArray(requirements) ? requirements : requirements.split(",");

        // Update the job
        const job = await Job.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                requirements: requirementsArray,
                salary,
                location,
                jobType,
                experienceLevel: experience,
                position,
                company: companyId,
            },
            { new: true }
        );

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Job updated successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.error("Error Updating job:", error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

export const filterCard = async (req, res) => {
    try {
      const { location, jobType, experienceLevel, skills } = req.query;
  
      const filterConditions = {};
  
      if (location) {
        filterConditions.location = { $in: location.split(',') }; // Handle multiple locations
      }
      if (jobType) {
        filterConditions.jobType = { $in: jobType.split(',') }; // Handle multiple job types
      }
      if (experienceLevel) {
        filterConditions.experienceLevel = { $in: experienceLevel.split(',') }; // Handle multiple experience levels
      }
      if (skills) {
        filterConditions.skills = { $in: skills.split(',') }; // Handle multiple skills
      }
  
      const jobs = await Job.find(filterConditions);
      res.json(jobs);
    } catch (error) {
      console.error('Error fetching filtered jobs:', error);
      res.status(500).send('Server Error');
    }
  };
  export const categoryJobs = async (req, res) => {
    const { category } = req.query;  // The category will be the query parameter
    try {
      console.log("Received Query:", category);
  
      // Build the filter based on the category search
      const filter = category
        ? {
            $or: [
              { jobType: { $regex: category, $options: "i" } }, // Job type matches category (you can adjust the field names as needed)
              { title: { $regex: category, $options: "i" } },
              { description: { $regex: category, $options: "i" } },
            ],
          }
        : {};  // If no category is provided, we return all jobs
  
      console.log("Filter Applied:", filter);
      const jobs = await Job.find(filter)  // Fetch jobs using the filter
        .populate('company', 'name location')  // Populate related company information
        .populate('created_by', 'username email');  // Populate the creator's details (like the recruiter)
  
      console.log("Jobs Found:", jobs);
      
      if (jobs.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No jobs found for the given category.",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Jobs searched successfully.",
        jobs,  // Send the list of jobs found
      });
    } catch (error) {
      console.error("Error searching jobs:", error);
      res.status(500).json({ message: "Error fetching search results." });
    }
  };