import React from "react";
import { Flex, Link } from "@chakra-ui/react";

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
    <Flex justifyContent="space-between" align="center" padding="30px 30px">
      <Link
        className="link"
        href="https://www.linkedin.com/in/fernando-ariel-rodriguez/"
      >
        Linkedin
      </Link>
      <Link className="link" href="https://twitter.com/xxykzdev">
        Tweeter
      </Link>
      {isConnected ? (
        <p>Estas conectado</p>
      ) : (
        <button onClick={connectAccount}>CONECTATE❤️</button>
      )}
    </Flex>
  );
};

export default Navbar;
