import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const Witnesses = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleAddWitness = () => {
    navigate(`${location.pathname}/add-witness`); // Navigate to the new route
  };

  console.log({ location });

  return (
    <div>
      <Button type="primary" onClick={handleAddWitness}>
        Add New Witness
      </Button>

      <br />
      <p>No witnesses added yet.</p>
    </div>
  );
};

export default Witnesses;
