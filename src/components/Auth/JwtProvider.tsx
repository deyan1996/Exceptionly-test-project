import React, { useEffect } from 'react';

const JwtProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInitialize());
  }, [dispatch]);

  return <>{children}</>;
};

export default JwtProvider;
