import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../../redux/store/Store';
import { hideSnackbar } from '../../redux/slices/SnackbarSlice';

const Snackbar = () => {
  const dispatch = useDispatch();
  const { open, message, type } = useSelector((state : RootState) => state.snackbar);

  const snackbarStyle = {
    position: 'fixed',
    bottom: '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '15px 20px',
    borderRadius: '5px',
    color: '#fff',
    backgroundColor: type === 'fail' ? 'red' : 'green',
    display: open ? 'block' : 'none',
    zIndex: '1111'
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (open) {
      timeoutId = setTimeout(() => {
        dispatch(hideSnackbar());
      }, 2000);
    }
    return () => clearTimeout(timeoutId);
  }, [open, dispatch]);

  return (
    <div style={snackbarStyle as React.CSSProperties}>
      <span>{message}</span>
    </div>
  );
};

export default Snackbar;
