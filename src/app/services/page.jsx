import React from 'react';

function page() {
    return (
        <div className='max-w-6xl mx-auto px-4 py-8'>
            <h1 className="text-2xl font-bold mb-4">Our Services</h1>
            <ul className="list-disc pl-5">
                <li>Web Development</li>
                <li>Mobile App Development</li>
                <li>UI/UX Design</li>
                <li>SEO Optimization</li>
            </ul>
        </div>
    );
}

export default page;