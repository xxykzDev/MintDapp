import React from "react";
import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import FARNFT from "./FARNFT.json"; // => importamos el ABI de nuestro smart contract

const contractAddress = "0x77Eb54094bF29ae3825052f71aB8C76caae32342";

const MainMint = ({ accounts, setAccounts }) => {
  const [mintaAmount, setmintAmount] = useState(1);
  const isConnected = Boolean(accounts[0]);

  async function handleMint() {
    if (window.ethers) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, FARNFT.abi, signer);
      //   encerramos la interaccion con la blockchain
      try {
        const response = await contract.mint(BigNumber.from(mintaAmount));
        console.log("response: ", response);
      } catch (err) {
        console.log("error: ", err);
      }
    }
  }

  const handleDecrement = () => {
    if (mintaAmount <= 1) return;
    setmintAmount(mintaAmount - 1);
  };

  const handleIncrement = () => {
    if (mintaAmount >= 3) return;
    setmintAmount(mintaAmount + 1);
  };

  return (
    <div>
      <h1>Fernando Ariel Rodriguez Example Collection</h1>
      <p>Proyecto que implementa tech web3</p>
      {isConnected ? (
        <div>
          <div>
            <button onClick={handleDecrement}>-</button>
            <input type="number" value={mintaAmount} />
            <button onClick={handleIncrement}>+</button>
          </div>
          <button onClick={handleMint}>Mintear</button>
        </div>
      ) : (
        <p>Tenes que conectarte para poder mintear! 😒</p>
      )}
    </div>
  );
};

export default MainMint;
