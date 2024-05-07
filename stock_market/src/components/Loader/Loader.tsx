import React from 'react';

const loaderStyles = {
  loaderIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
  },
  loaderCircle: {
    border: '4px solid #007bff',
    borderRadius: '50%',
    borderTop: '4px solid transparent',
    width: '30px',
    height: '30px',
    animation: 'spin 0.5s linear infinite',
  }
};

const Loader: React.FC = () => {
  return (
    <div style={loaderStyles.loaderIcon}>
      <div style={loaderStyles.loaderCircle}></div>
    </div>
  );
}

export default Loader;