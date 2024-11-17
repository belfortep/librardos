import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext'

export const Advertisment = () => {
  const { user } = useContext(AuthContext);
  const [isPremium, setIsPremium] = useState(false);

  return (
    <>
      {/* setIsPremium(user.premium) */}
      {!isPremium && (
        <div className="horizontal-banner" style={{ backgroundColor: "black", height: "100px", color: "white" }}>
            {/* Removed the img tag to make it a solid black banner */}
            <p style={{ color: "white" }}>Aca iria un anuncio, aun no tenemos clientes comerciales.</p>
        </div>
      )}
    </>
  );
};
