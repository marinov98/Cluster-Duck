import React, { Component } from "react";

function ProfileClasses(props){
	return (
		<div style={{fontSize:"14px"}}>
			<div>{props.classType} classes </div>
			{props.classes.map((item,index) => (
				<li> {item} </li>
			))}
		</div>
	);
}

export default ProfileClasses