//SPDX-License-identifier: UNLINCESED
pragma solidity ^0.8.4; // => version del compilador

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FARNFT is ERC721, Ownable {
    uint256 public mintPrice;
    uint256 public totalSupply;
    uint256 public maxSuply;
    uint256 public maxPerWallet;
    string internal baseTokenUri;
    bool public isPublicMintEnabled;
    address payable public withdrawWallet;
    mapping(address => uint256) public walletMints;

    constructor() payable ERC721("ERC721", "FARNFT") {
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSuply = 10000;
        maxPerWallet = 3;
    }

    function setIsPublicMintEnabled(bool _isPublicMintEnabled)
        external
        onlyOwner
    {
        isPublicMintEnabled = _isPublicMintEnabled;
    }

    function setBaseTokenUri(string calldata _baseTokenUri) external onlyOwner {
        baseTokenUri = _baseTokenUri;
    }

    function tokenUri(uint256 _tokenId) public view returns (string memory) {
        require(_exists(_tokenId), "El token no existe");
        return
            string(
                abi.encodePacked(
                    baseTokenUri,
                    Strings.toString(_tokenId),
                    ".json"
                )
            );
    }

    function withdraw() external onlyOwner {
        (bool success, ) = withdrawWallet.call{value: address(this).balance}(
            ""
        );
        require(success, "withdraw fail");
    }

    function mint(uint256 _quantity) public payable {
        require(isPublicMintEnabled, "El minteo publico no esta abierto aun");
        require(
            msg.value == _quantity * mintPrice,
            "La candtidad de Ether enviada no es la correcta"
        );
        require(totalSupply + _quantity <= maxSuply, "No hay suficientes NFTs");
        require(
            walletMints[msg.sender] + _quantity <= maxPerWallet,
            "Has agotado la cantidad de minteos!"
        );

        for (uint256 i = 0; i < _quantity; i++) {
            uint256 newTokenId = totalSupply + 1;
            totalSupply++;
            _safeMint((msg.sender), newTokenId); // implementaciond e funcion heredada del estandar ERC721
        }
    }
}
