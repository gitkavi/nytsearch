import React from 'react';

const styles = {
    div:{
        paddingLeft:'75px',
        paddingRight:'25px'
    },
    input:{
        width:"95%",
        textAlign:"center"
    }
  }

export const Input = props => {
    return(
        <div className="form-group" style={styles.div}>
            <input className="form-control" style={styles.input} {...props} />
        </div>
    );
}
