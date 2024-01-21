/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  BigNumberish,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../../common";
import type { EAS, EASInterface } from "../../../contracts/EAS.sol/EAS";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IDC",
        name: "_dc",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_maxNumAlias",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAINTAINER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SEPARATOR",
    outputs: [
      {
        internalType: "bytes1",
        name: "",
        type: "bytes1",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "aliasName",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "commitment",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "publicAlias",
        type: "string",
      },
    ],
    name: "activate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "configs",
    outputs: [
      {
        internalType: "uint256",
        name: "numAlias",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "disallowMaintainer",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "dc",
    outputs: [
      {
        internalType: "contract IDC",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "aliasName",
        type: "bytes32",
      },
    ],
    name: "deactivate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "deactivateAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
    ],
    name: "getAllowMaintainerAccess",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "aliasName",
        type: "bytes32",
      },
    ],
    name: "getCommitment",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
    ],
    name: "getNumAlias",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
    ],
    name: "getPublicAliases",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxNumAlias",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IDC",
        name: "_dc",
        type: "address",
      },
    ],
    name: "setDc",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_maxNumAlias",
        type: "uint256",
      },
    ],
    name: "setMaxNumAlias",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string[]",
        name: "aliases",
        type: "string[]",
      },
    ],
    name: "setPublicAliases",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract EAS",
        name: "_upgradedFrom",
        type: "address",
      },
    ],
    name: "setUpgradedFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "toggleMaintainerAccess",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "upgradedFrom",
    outputs: [
      {
        internalType: "contract EAS",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "bytes32",
        name: "msgHash",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "aliasName",
        type: "string",
      },
      {
        internalType: "string",
        name: "forwardAddress",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "sig",
        type: "bytes",
      },
    ],
    name: "verify",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200249e3803806200249e833981016040819052620000349162000136565b600380546001600160a01b0319166001600160a01b03841617905560048190556200006160003362000095565b6200008d7f339759585899103d2ace64958e37e18ccb0504652c81d4a1b8aa80fe2126ab953362000095565b505062000172565b6000828152602081815260408083206001600160a01b038516845290915290205460ff1662000132576000828152602081815260408083206001600160a01b03851684529091529020805460ff19166001179055620000f13390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b600080604083850312156200014a57600080fd5b82516001600160a01b03811681146200016257600080fd5b6020939093015192949293505050565b61231c80620001826000396000f3fe608060405234801561001057600080fd5b506004361061018e5760003560e01c80639e22d335116100de578063ce8f607811610097578063d8a531a611610071578063d8a531a6146103ec578063d9aad0bc146103ff578063e0aecae214610412578063f87422541461043257600080fd5b8063ce8f607814610382578063cf1db05c146103c6578063d547741f146103d957600080fd5b80639e22d3351461030d578063a217fddf14610320578063bbda006314610328578063c19cc87a1461033b578063c8e7179114610366578063ccc1a6bc1461037957600080fd5b80633e635bb91161014b5780635d27e9a6116101255780635d27e9a6146102b0578063687d4a9b146102d4578063738df693146102e757806391d14854146102fa57600080fd5b80633e635bb91461025f5780634eeb2ed6146102725780635b3cef0c1461028557600080fd5b806301ffc9a714610193578063248a9ca3146101bb578063277fc21e146101ec57806328220df5146102135780632f2ff15d1461023757806336568abe1461024c575b600080fd5b6101a66101a13660046118ed565b610447565b60405190151581526020015b60405180910390f35b6101de6101c9366004611917565b60009081526020819052604090206001015490565b6040519081526020016101b2565b6101a66101fa366004611917565b60009081526001602052604090206004015460ff161590565b6101de610221366004611917565b6000908152600160208190526040909120015490565b61024a610245366004611945565b61047e565b005b61024a61025a366004611945565b6104a8565b61024a61026d366004611a75565b61052b565b61024a610280366004611b3d565b610790565b600254610298906001600160a01b031681565b6040516001600160a01b0390911681526020016101b2565b6102bb601f60fa1b81565b6040516001600160f81b031990911681526020016101b2565b61024a6102e2366004611917565b6108f4565b61024a6102f5366004611b3d565b610905565b6101a6610308366004611945565b610b4c565b61024a61031b366004611b7a565b610b75565b6101de600081565b61024a610336366004611bf8565b610e81565b6101de610349366004611cdf565b600091825260016020908152604080842092845291905290205490565b61024a610374366004611d01565b611061565b6101de60045481565b6103b1610390366004611917565b60016020819052600091825260409091209081015460049091015460ff1682565b604080519283529015156020830152016101b2565b61024a6103d4366004611d01565b61108f565b61024a6103e7366004611945565b6110bd565b600354610298906001600160a01b031681565b61024a61040d366004611d1e565b6110e2565b610425610420366004611917565b6113fc565b6040516101b29190611db3565b6101de6000805160206122c783398151915281565b60006001600160e01b03198216637965db0b60e01b148061047857506301ffc9a760e01b6001600160e01b03198316145b92915050565b600082815260208190526040902060010154610499816114eb565b6104a383836114f8565b505050565b6001600160a01b038116331461051d5760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b610527828261157c565b5050565b600354604051634907fd1360e11b81526000916001600160a01b03169063920ffa269061055c908c90600401611e15565b602060405180830381865afa158015610579573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061059d9190611e28565b89516020808c01919091206000818152600190925260408083209051939450909282906105cd908c908c90611e45565b60405180910390208152602001908152602001600020549050600060018b878760418181106105fe576105fe611e55565b919091013560f81c9050610616602060008a8c611e6b565b61061f91611e95565b61062d604060208b8d611e6b565b61063691611e95565b6040805160008152602081018083529590955260ff909316928401929092526060830152608082015260a0016020604051602081039080840390855afa158015610684573d6000803e3d6000fd5b505050602060405103519050836001600160a01b0316816001600160a01b0316146106f15760405162461bcd60e51b815260206004820152601760248201527f4541533a207369676e6174757265206d69736d617463680000000000000000006044820152606401610514565b60008a8a601f60fa1b8b8b601f60fa1b8c8c60405160200161071a989796959493929190611eb3565b6040516020818303038152906040528051906020012090508083146107815760405162461bcd60e51b815260206004820152601860248201527f4541533a20636f6d6d69746d656e74206d69736d6174636800000000000000006044820152606401610514565b50505050505050505050505050565b600354604051634907fd1360e11b815282916000916001600160a01b039091169063920ffa26906107c5908590600401611e15565b602060405180830381865afa1580156107e2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108069190611e28565b6003546040516305457b3d60e01b81529192506000916001600160a01b03909116906305457b3d9061083c908690600401611e15565b602060405180830381865afa158015610859573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061087d9190611ef7565b90506001600160a01b03821633146108a75760405162461bcd60e51b815260040161051490611f10565b4281116108c65760405162461bcd60e51b815260040161051490611f3f565b50508151602092830120600090815260019092525060409020600401805460ff19811660ff90911615179055565b60006108ff816114eb565b50600455565b600354604051634907fd1360e11b815282916000916001600160a01b039091169063920ffa269061093a908590600401611e15565b602060405180830381865afa158015610957573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061097b9190611e28565b6003546040516305457b3d60e01b81529192506000916001600160a01b03909116906305457b3d906109b1908690600401611e15565b602060405180830381865afa1580156109ce573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109f29190611ef7565b9050428111610a135760405162461bcd60e51b815260040161051490611f3f565b82516020808501919091206000818152600190925260409091206004015460ff1615610a66576001600160a01b0383163314610a615760405162461bcd60e51b815260040161051490611f10565b610aac565b6001600160a01b038316331480610a905750610a906000805160206122c783398151915233610b4c565b610aac5760405162461bcd60e51b815260040161051490611f6c565b8451602080870191909120600081815260019092526040822090915b6003820154811015610b1f57816000016000836003018381548110610aef57610aef611e55565b90600052602060002001548152602001908152602001600020600090558080610b1790611fc5565b915050610ac8565b50610b2e6003820160006117ef565b610b3c60028201600061180d565b6000600190910155505050505050565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b600354604051634907fd1360e11b815286916000916001600160a01b039091169063920ffa2690610baa908590600401611e15565b602060405180830381865afa158015610bc7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610beb9190611e28565b6003546040516305457b3d60e01b81529192506000916001600160a01b03909116906305457b3d90610c21908690600401611e15565b602060405180830381865afa158015610c3e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c629190611ef7565b9050428111610c835760405162461bcd60e51b815260040161051490611f3f565b82516020808501919091206000818152600190925260409091206004015460ff1615610cd6576001600160a01b0383163314610cd15760405162461bcd60e51b815260040161051490611f10565b610d1c565b6001600160a01b038316331480610d005750610d006000805160206122c783398151915233610b4c565b610d1c5760405162461bcd60e51b815260040161051490611f6c565b86610d695760405162461bcd60e51b815260206004820152601760248201527f4541533a20696e76616c696420636f6d6d69746d656e740000000000000000006044820152606401610514565b88516020808b0191909120600081815260019283905260409020600454928101549192909110801590610da8575060008a815260208290526040902054155b15610df55760405162461bcd60e51b815260206004820152601960248201527f4541533a206578636565646564206d61784e756d416c696173000000000000006044820152606401610514565b60008a815260208290526040902054610e66576001816001016000828254610e1d9190611fde565b909155505060038101805460018101825560009182526020909120018a90558615610e66576002810180546001810182556000918252602090912001610e64888a83612079565b505b6000998a526020525050604090962094909455505050505050565b600354604051634907fd1360e11b815283916000916001600160a01b039091169063920ffa2690610eb6908590600401611e15565b602060405180830381865afa158015610ed3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ef79190611e28565b6003546040516305457b3d60e01b81529192506000916001600160a01b03909116906305457b3d90610f2d908690600401611e15565b602060405180830381865afa158015610f4a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f6e9190611ef7565b9050428111610f8f5760405162461bcd60e51b815260040161051490611f3f565b82516020808501919091206000818152600190925260409091206004015460ff1615610fe2576001600160a01b0383163314610fdd5760405162461bcd60e51b815260040161051490611f10565b611028565b6001600160a01b03831633148061100c575061100c6000805160206122c783398151915233610b4c565b6110285760405162461bcd60e51b815260040161051490611f6c565b85516020808801919091206000818152600183526040902087519192611057926002909201919089019061182b565b5050505050505050565b600061106c816114eb565b50600380546001600160a01b0319166001600160a01b0392909216919091179055565b600061109a816114eb565b50600280546001600160a01b0319166001600160a01b0392909216919091179055565b6000828152602081905260409020600101546110d8816114eb565b6104a3838361157c565b600354604051634907fd1360e11b815283916000916001600160a01b039091169063920ffa2690611117908590600401611e15565b602060405180830381865afa158015611134573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111589190611e28565b6003546040516305457b3d60e01b81529192506000916001600160a01b03909116906305457b3d9061118e908690600401611e15565b602060405180830381865afa1580156111ab573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111cf9190611ef7565b90504281116111f05760405162461bcd60e51b815260040161051490611f3f565b82516020808501919091206000818152600190925260409091206004015460ff1615611243576001600160a01b038316331461123e5760405162461bcd60e51b815260040161051490611f10565b611289565b6001600160a01b03831633148061126d575061126d6000805160206122c783398151915233610b4c565b6112895760405162461bcd60e51b815260040161051490611f6c565b85516020808801919091206000818152600183526040808220898352938490529020549091906112fb5760405162461bcd60e51b815260206004820152601860248201527f4541533a20616c726561647920646561637469766174656400000000000000006044820152606401610514565b6001816001016000828254611310919061213a565b909155505060008781526020829052604081208190556003820154905b6003830154811015611379578883600301828154811061134f5761134f611e55565b90600052602060002001540361136757809150611379565b8061137181611fc5565b91505061132d565b5060038201805461138c9060019061213a565b8154811061139c5761139c611e55565b90600052602060002001548260030182815481106113bc576113bc611e55565b600091825260209091200155600382018054806113db576113db61214d565b60019003818190600052602060002001600090559055505050505050505050565b606060016000838152602001908152602001600020600201805480602002602001604051908101604052809291908181526020016000905b828210156114e057838290600052602060002001805461145390611ff1565b80601f016020809104026020016040519081016040528092919081815260200182805461147f90611ff1565b80156114cc5780601f106114a1576101008083540402835291602001916114cc565b820191906000526020600020905b8154815290600101906020018083116114af57829003601f168201915b505050505081526020019060010190611434565b505050509050919050565b6114f581336115e1565b50565b6115028282610b4c565b610527576000828152602081815260408083206001600160a01b03851684529091529020805460ff191660011790556115383390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6115868282610b4c565b15610527576000828152602081815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6115eb8282610b4c565b610527576115f88161163a565b61160383602061164c565b604051602001611614929190612163565b60408051601f198184030181529082905262461bcd60e51b825261051491600401611e15565b60606104786001600160a01b03831660145b6060600061165b8360026121d8565b611666906002611fde565b67ffffffffffffffff81111561167e5761167e611975565b6040519080825280601f01601f1916602001820160405280156116a8576020820181803683370190505b509050600360fc1b816000815181106116c3576116c3611e55565b60200101906001600160f81b031916908160001a905350600f60fb1b816001815181106116f2576116f2611e55565b60200101906001600160f81b031916908160001a90535060006117168460026121d8565b611721906001611fde565b90505b6001811115611799576f181899199a1a9b1b9c1cb0b131b232b360811b85600f166010811061175557611755611e55565b1a60f81b82828151811061176b5761176b611e55565b60200101906001600160f81b031916908160001a90535060049490941c93611792816121ef565b9050611724565b5083156117e85760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610514565b9392505050565b50805460008255906000526020600020908101906114f59190611881565b50805460008255906000526020600020908101906114f59190611896565b828054828255906000526020600020908101928215611871579160200282015b8281111561187157825182906118619082612206565b509160200191906001019061184b565b5061187d929150611896565b5090565b5b8082111561187d5760008155600101611882565b8082111561187d5760006118aa82826118b3565b50600101611896565b5080546118bf90611ff1565b6000825580601f106118cf575050565b601f0160209004906000526020600020908101906114f59190611881565b6000602082840312156118ff57600080fd5b81356001600160e01b0319811681146117e857600080fd5b60006020828403121561192957600080fd5b5035919050565b6001600160a01b03811681146114f557600080fd5b6000806040838503121561195857600080fd5b82359150602083013561196a81611930565b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff811182821017156119b4576119b4611975565b604052919050565b600082601f8301126119cd57600080fd5b813567ffffffffffffffff8111156119e7576119e7611975565b6119fa601f8201601f191660200161198b565b818152846020838601011115611a0f57600080fd5b816020850160208301376000918101602001919091529392505050565b60008083601f840112611a3e57600080fd5b50813567ffffffffffffffff811115611a5657600080fd5b602083019150836020828501011115611a6e57600080fd5b9250929050565b60008060008060008060008060a0898b031215611a9157600080fd5b883567ffffffffffffffff80821115611aa957600080fd5b611ab58c838d016119bc565b995060208b0135985060408b0135915080821115611ad257600080fd5b611ade8c838d01611a2c565b909850965060608b0135915080821115611af757600080fd5b611b038c838d01611a2c565b909650945060808b0135915080821115611b1c57600080fd5b50611b298b828c01611a2c565b999c989b5096995094979396929594505050565b600060208284031215611b4f57600080fd5b813567ffffffffffffffff811115611b6657600080fd5b611b72848285016119bc565b949350505050565b600080600080600060808688031215611b9257600080fd5b853567ffffffffffffffff80821115611baa57600080fd5b611bb689838a016119bc565b965060208801359550604088013594506060880135915080821115611bda57600080fd5b50611be788828901611a2c565b969995985093965092949392505050565b60008060408385031215611c0b57600080fd5b823567ffffffffffffffff80821115611c2357600080fd5b611c2f868387016119bc565b9350602091508185013581811115611c4657600080fd5b8501601f81018713611c5757600080fd5b803582811115611c6957611c69611975565b8060051b611c7885820161198b565b918252828101850191858101908a841115611c9257600080fd5b86850192505b83831015611cce57823586811115611cb05760008081fd5b611cbe8c89838901016119bc565b8352509186019190860190611c98565b809750505050505050509250929050565b60008060408385031215611cf257600080fd5b50508035926020909101359150565b600060208284031215611d1357600080fd5b81356117e881611930565b60008060408385031215611d3157600080fd5b823567ffffffffffffffff811115611d4857600080fd5b611d54858286016119bc565b95602094909401359450505050565b60005b83811015611d7e578181015183820152602001611d66565b50506000910152565b60008151808452611d9f816020860160208601611d63565b601f01601f19169290920160200192915050565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b82811015611e0857603f19888603018452611df6858351611d87565b94509285019290850190600101611dda565b5092979650505050505050565b6020815260006117e86020830184611d87565b600060208284031215611e3a57600080fd5b81516117e881611930565b8183823760009101908152919050565b634e487b7160e01b600052603260045260246000fd5b60008085851115611e7b57600080fd5b83861115611e8857600080fd5b5050820193919092039150565b8035602083101561047857600019602084900360031b1b1692915050565b87898237600088820160ff60f81b808a1682528789600184013786166001918801918201528385600283013760009301600201928352509098975050505050505050565b600060208284031215611f0957600080fd5b5051919050565b60208082526015908201527422a0a99d103737ba103237b6b0b4b71037bbb732b960591b604082015260600190565b602080825260139082015272115054ce88191bdb585a5b88195e1c1a5c9959606a1b604082015260600190565b60208082526023908201527f4541533a206e6f7420646f6d61696e206f776e6572206f72206d61696e7461696040820152623732b960e91b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b600060018201611fd757611fd7611faf565b5060010190565b8082018082111561047857610478611faf565b600181811c9082168061200557607f821691505b60208210810361202557634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156104a357600081815260208120601f850160051c810160208610156120525750805b601f850160051c820191505b818110156120715782815560010161205e565b505050505050565b67ffffffffffffffff83111561209157612091611975565b6120a58361209f8354611ff1565b8361202b565b6000601f8411600181146120d957600085156120c15750838201355b600019600387901b1c1916600186901b178355612133565b600083815260209020601f19861690835b8281101561210a57868501358255602094850194600190920191016120ea565b50868210156121275760001960f88860031b161c19848701351681555b505060018560011b0183555b5050505050565b8181038181111561047857610478611faf565b634e487b7160e01b600052603160045260246000fd5b7f416363657373436f6e74726f6c3a206163636f756e742000000000000000000081526000835161219b816017850160208801611d63565b7001034b99036b4b9b9b4b733903937b6329607d1b60179184019182015283516121cc816028840160208801611d63565b01602801949350505050565b808202811582820484141761047857610478611faf565b6000816121fe576121fe611faf565b506000190190565b815167ffffffffffffffff81111561222057612220611975565b6122348161222e8454611ff1565b8461202b565b602080601f83116001811461226957600084156122515750858301515b600019600386901b1c1916600185901b178555612071565b600085815260208120601f198616915b8281101561229857888601518255948401946001909101908401612279565b50858210156122b65787850151600019600388901b60f8161c191681555b5050505050600190811b0190555056fe339759585899103d2ace64958e37e18ccb0504652c81d4a1b8aa80fe2126ab95a264697066735822122001a571468d96602fa32679f09132ee3a5eda99ee6e2993e94413572adf360c9964736f6c63430008110033";

type EASConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: EASConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class EAS__factory extends ContractFactory {
  constructor(...args: EASConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _dc: AddressLike,
    _maxNumAlias: BigNumberish,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(_dc, _maxNumAlias, overrides || {});
  }
  override deploy(
    _dc: AddressLike,
    _maxNumAlias: BigNumberish,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(_dc, _maxNumAlias, overrides || {}) as Promise<
      EAS & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): EAS__factory {
    return super.connect(runner) as EAS__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): EASInterface {
    return new Interface(_abi) as EASInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): EAS {
    return new Contract(address, _abi, runner) as unknown as EAS;
  }
}
