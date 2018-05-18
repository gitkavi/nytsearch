import React from 'react';

const styles = {
    btn:{
        backgroundColor:"#2d3e4f",
        color:"white",
        padding:'10px'
    }
  }

export const FormBtn = props => {
    return (
        <button className="btn" style={styles.btn} {...props}>
            {props.children}
        </button>
    );
}