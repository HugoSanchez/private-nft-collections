// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 < 0.9.0;

import "contracts/private-cols/PrivateCollection.sol";
import "contracts/private-cols/CollectionRegistry.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CollectionFactory is Ownable {

    address public _collectionRegistryAddress; 

    event CollectionCreated(address newCollectionAddress);

    constructor(address collectionRegistry) {
        _collectionRegistryAddress = collectionRegistry;
    }

    function createCollection(
        string memory collectionMetadataURI,

        uint _price
        ) external returns (address) {
            
            PrivateCollection newInstance = new PrivateCollection();
            PrivateCollection(newInstance).initialize(collectionMetadataURI, msg.sender);
            CollectionRegistry(_collectionRegistryAddress).createCollection("0x", collectionMetadataURI, address(newInstance), _price, msg.sender);
            emit CollectionCreated(address(newInstance));
            return address(newInstance);

    }
}


// 000500000000000000