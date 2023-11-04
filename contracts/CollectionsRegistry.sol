// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 < 0.9.0;


import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";



contract CollectionRegistry is ERC1155Upgradeable, OwnableUpgradeable, UUPSUpgradeable {

   
    /////////////////////////////
    // State Variables
    /////////////////////////////

    // Setting up counter
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    /////////////////////////////
    // Mappings
    /////////////////////////////


    // Mapping from token ID to  URIs
    mapping(uint256 => string) private _uris;
    // TokenID => Supply
    mapping(uint256 => uint256) public tokenSupply;
    // TokenID => Price
    mapping(uint256 => uint256) public price;
    // TokenID => Creator
    mapping(uint256 => address) public creator;
    // TokenID => Address
    mapping(uint256 => address) public collectionAddress;


    ////////////////////////////////
    // Initialize 
    ///////////////////////////////
    function initialize(

        ) public initializer {
             // Initiate ownable 
            __Ownable_init();
            // Initiate ERC1155
            __ERC1155_init("");
            // Initiate UUPS
            __UUPSUpgradeable_init();
    }

    ////////////////////////////////
    // Basic functions get/set
    ///////////////////////////////

    // Get token URI
    function uri(uint tokenID) override public view returns (string memory) {
        return string.concat(_uris[tokenID]);
    }

    // Sets the token metadata
    function _setTokenMetadata(
        uint256 tokenId,
        string memory url
    ) internal virtual returns (string memory) {
        require(bytes(_uris[tokenId]).length == 0, "URI already set");
        _uris[tokenId] = url;
        return _uris[tokenId];
    }

    /////////////////////////////////
    // Core functionality
    ///////////////////////////////

    function createCollection (
        bytes memory data, 
        string calldata url, 
        address _collectionAddress,
        uint _price,
        address _creator
    )
        public
        payable
    {   
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(_creator, newTokenId, 1, data);
        _setTokenMetadata(newTokenId, url);
        creator[newTokenId] = _creator;  
        collectionAddress[newTokenId] = _collectionAddress;
        price[newTokenId] = _price;      
    }

    function collect(uint id, address recipient, bytes memory data)
        public 
        payable
        returns (string memory)
    {
        require(balanceOf(recipient, id) == 0, "Only one per user"); 
        // Add pricing requirements
        _mint(msg.sender, id, 1, data);
        super.safeTransferFrom(msg.sender, recipient, id, 1, data);
        return _uris[id];
    }    

    function burn(address account, uint256 id, uint256 value)
        public 
        virtual 
    {
        _burn(account, id, value);
    }

    ////////////////////////////
    // Others: Mandatory
    ////////////////////////////

    function _authorizeUpgrade(address newImplementation)
        internal
        onlyOwner
        override
    {}

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
    
    function name() public pure returns (string memory) {
        return "versos";
    }

    function overrideTokenMetadata(
        uint256 tokenId,
        string memory url
    ) 
        public 
        onlyOwner 
        {
        _uris[tokenId] = url;
    }

}
