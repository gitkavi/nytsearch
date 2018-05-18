import React from "react";
import "./Header.css";

const Header = () =>{
    return(
        <div className="container jumbotron">
          <h1 className="header"> New York Times Article Scrubber </h1>
          <hr/>
          <p className="subtext">Search for and annotate articles of interest !</p>
        </div>
    );
}

export default Header;