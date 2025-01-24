import jwt from 'jsonwebtoken';

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Set to true in production with HTTPS
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,  // 1 week
};

export const setAuthToken = (user, res) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('auth_token', token, COOKIE_OPTIONS);

    return res.status(200).json({
        success: true,
        message: 'Logged in successfully',
        user: {
            id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            bio: user.bio || '',
            skills: user.skills || [],
            resume: user.resume || '',
            resumeOriginalName: user.resumeOriginalName || '',
            profilePhoto: user.profilePhoto || '',
            company: user.company || null, // Company reference if populated
        },
        token,  // Send the token in the response body
    });
};
