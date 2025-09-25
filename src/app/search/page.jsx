import React from 'react';

function page(props) {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Search Results</h1>
            <p className="text-gray-700">
                No results found for: {props.searchTerm}
            </p>
        </div>
    );
}

export default page;