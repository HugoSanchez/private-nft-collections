// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155ReceiverUpgradeable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract PrivateCollection is ERC1155URIStorageUpgradeable, OwnableUpgradeable {
    // Setting up counter
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;


    // Collection metadata
    string public _collectionMetadataURI;


    ////////////////////////////////
    // Initialize 
    ///////////////////////////////
    function initialize(
        string memory collectionMetadataURI,
        address newOwner
        ) public initializer {
            // Setting up collection settings
            _collectionMetadataURI = collectionMetadataURI;
            __ERC1155_init("");
            // Initiate ownable 
            __Ownable_init();
            transferOwnership(newOwner);
    }

    ////////////////////////////////
    // Basic functions get/set
    ///////////////////////////////

    // Sets collection metadata uri (name, decription, etc).
    function setCollectionMetadataURI(string calldata newMetadataURI)
        public 
    {
        _collectionMetadataURI = newMetadataURI;
    }


    // Withdraw. Only owner. 
    function withdraw(address payable _to) public {
        _to.transfer(address(this).balance);
    }

    ////////////////////////////
    // Others: Mandatory
    ////////////////////////////


     // This is necessary to be able to inherit ACL.
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155Upgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }


}
