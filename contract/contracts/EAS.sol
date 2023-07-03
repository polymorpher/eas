// SPDX-License-Identifier: CC-BY-NC-4.0

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

interface IDC {
    function ownerOf(string memory name) external view returns (address);

    function nameExpires(string memory name) external view returns (uint256);
}

contract EAS is AccessControl {
    // Note: `alias` is a reserved keyword in solidity, so we use aliasName instead for variable names when we meant `alias`

    struct EASConfig {
        // alias hash => commitment hash;
        // later alias can be a regex with capturing, so it should be kept hashed and remain confidential. It's also more efficient to store it this way
        mapping(bytes32 => bytes32) forwards;
        uint256 numAlias; // only a single config is supported in initial version
        string[] publicAliases; // user-configured; we do not verify.
        bytes32[] keys; // list of keys in forwards
        bool disallowMaintainer;
    }

    mapping(bytes32 => EASConfig) public configs;
    EAS public upgradedFrom;

    bytes1 public constant SEPARATOR = bytes1("|");
    bytes32 public constant MAINTAINER_ROLE = keccak256("MAINTAINER_ROLE");

    IDC public dc;
    uint256 public maxNumAlias;

    constructor(IDC _dc, uint256 _maxNumAlias) {
        dc = _dc;
        maxNumAlias = _maxNumAlias;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MAINTAINER_ROLE, msg.sender);
    }

    function getAllowMaintainerAccess(bytes32 node) public view returns (bool){
        return !configs[node].disallowMaintainer;
    }


    function getCommitment(bytes32 node, bytes32 aliasName) public view returns (bytes32){
        return configs[node].forwards[aliasName];
    }

    function getPublicAliases(bytes32 node) public view returns (string[] memory){
        return configs[node].publicAliases;
    }

    function getNumAlias(bytes32 node) public view returns (uint256){
        return configs[node].numAlias;
    }

    function setDc(IDC _dc) public onlyRole(DEFAULT_ADMIN_ROLE) {
        dc = _dc;
    }

    function setMaxNumAlias(uint256 _maxNumAlias) public onlyRole(DEFAULT_ADMIN_ROLE) {
        maxNumAlias = _maxNumAlias;
    }

    function setUpgradedFrom(EAS _upgradedFrom) public onlyRole(DEFAULT_ADMIN_ROLE) {
        upgradedFrom = _upgradedFrom;
    }

    modifier onlyNameOwner(string memory name){
        address renter = dc.ownerOf(name);
        uint256 expiry = dc.nameExpires(name);
        require(renter == msg.sender, "EAS: not domain owner");
        require(expiry > block.timestamp, "EAS: domain expired");
        _;
    }

    modifier onlyNameOwnerOrMaintainer(string memory name){
        address renter = dc.ownerOf(name);
        uint256 expiry = dc.nameExpires(name);
        require(expiry > block.timestamp, "EAS: domain expired");
        bytes32 node = keccak256(bytes(name));
        if (configs[node].disallowMaintainer) {
            require(renter == msg.sender, "EAS: not domain owner");
        } else {
            require(renter == msg.sender || hasRole(MAINTAINER_ROLE, msg.sender), "EAS: not domain owner or maintainer");
        }
        _;
    }

    function activate(string memory name, bytes32 aliasName, bytes32 commitment, string calldata publicAlias) public onlyNameOwnerOrMaintainer(name) {
        require(commitment != bytes32(0), "EAS: invalid commitment");
        bytes32 node = keccak256(bytes(name));
        EASConfig storage ec = configs[node];
        if (ec.numAlias >= maxNumAlias && ec.forwards[aliasName] == bytes32(0)) {
            revert("EAS: exceeded maxNumAlias");
        }
        if (ec.forwards[aliasName] == bytes32(0)) {
            ec.numAlias += 1;
            ec.keys.push(aliasName);
            if (bytes(publicAlias).length > 0) {
                ec.publicAliases.push(publicAlias);
            }
        }
        ec.forwards[aliasName] = commitment;
    }

    function deactivate(string memory name, bytes32 aliasName) public onlyNameOwnerOrMaintainer(name) {
        bytes32 node = keccak256(bytes(name));
        EASConfig storage ec = configs[node];
        require(ec.forwards[aliasName] != bytes32(0), "EAS: already deactivated");
        ec.numAlias -= 1;
        delete ec.forwards[aliasName];
        uint256 pos = ec.keys.length;
        for (uint256 i = 0; i < ec.keys.length; i++) {
            if (ec.keys[i] == aliasName) {
                pos = i;
                break;
            }
        }
        ec.keys[pos] = ec.keys[ec.keys.length - 1];
        ec.keys.pop();
    }

    function deactivateAll(string memory name) public onlyNameOwnerOrMaintainer(name) {
        bytes32 node = keccak256(bytes(name));
        EASConfig storage ec = configs[node];
        for (uint256 i = 0; i < ec.keys.length; i++) {
            delete ec.forwards[ec.keys[i]];
        }
        delete ec.keys;
        delete ec.publicAliases;
        ec.numAlias = 0;
    }

    function setPublicAliases(string memory name, string[] memory aliases) public onlyNameOwnerOrMaintainer(name) {
        bytes32 node = keccak256(bytes(name));
        configs[node].publicAliases = aliases;
    }

    function toggleMaintainerAccess(string memory name) public onlyNameOwner(name) {
        bytes32 node = keccak256(bytes(name));
        configs[node].disallowMaintainer = !configs[node].disallowMaintainer;
    }


    function verify(string memory name, bytes32 msgHash, string calldata aliasName, string calldata forwardAddress, bytes calldata sig) external view {
        address renter = dc.ownerOf(name);
        bytes32 node = keccak256(bytes(name));
        bytes32 commitment = configs[node].forwards[keccak256(bytes(aliasName))];
        address signer = ecrecover(msgHash, uint8(sig[65]), bytes32(sig[0 : 32]), bytes32(sig[32 : 64]));
        require(signer == renter, "EAS: signature mismatch");
        bytes32 computedCommitment = keccak256(bytes.concat(bytes(aliasName), SEPARATOR, bytes(forwardAddress), SEPARATOR, sig));
        require(commitment == computedCommitment, "EAS: commitment mismatch");
    }
}