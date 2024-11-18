import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext'

export const Advertisment = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {(!user || !user.isPremium) && (
        <div className="horizontal-banner" style={{ backgroundColor: "black", height: "100px", color: "white" }}>
            <p style={{ color: "white" }}>Aca iria un anuncio, aun no tenemos clientes comerciales.</p>
        </div>
      )}
    </>
  );
};
