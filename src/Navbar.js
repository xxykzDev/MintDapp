import React from "react";

const Navbar = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0]);

  async function connectAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  }
  return (
    <div>
      <div>Linkedin</div>
      <div>Tweeter</div>
      {isConnected ? (
        <p>Estas conectado</p>
      ) : (
        <button onClick={connectAccount}>CONECTATE❤️</button>
      )}
    </div>
  );
};

export default Navbar;
