import React from 'react';

const Employee = ({item})=>(
	<li>
	<p>{item.Name}</p>
    <p>{item.Gender}</p>
    <p>{item.Department}</p>
	</li>
);

export default Employee;