import React, { Component } from "react";

function ProfileClasses(props) {
  return (
  	<div>
	  	<div style={{
	  		fontSize: "14px",
	  		marginLeft: "50px"
	  	}}>
		  	<div style={{
		  		textAlign: "left"
		  	}}>
		  	{props.classType} classes 
		  	</div>
	  	</div>
  		<div style={{
    		marginLeft: "60px"
    		}}>
		    <div style={{ 
		    	fontSize: "14px",
		    	textAlign: "left" 
		    }}>
		      {props.classes.map((item, index) => (
		        <li> {item} </li>
		      ))}
		    </div>
	    </div>
    </div>
  );
}

export default ProfileClasses;
