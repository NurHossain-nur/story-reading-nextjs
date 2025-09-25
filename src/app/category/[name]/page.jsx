import React from 'react';

function page(props) {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Category: {props.params.name}</h1>
            <p className="text-gray-700">
                This is the category page for: {props.params.name}
            </p>
        </div>
    );
}

export default page;