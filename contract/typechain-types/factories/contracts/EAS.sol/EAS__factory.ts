/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
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
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
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
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
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
    name: "deactivate",
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
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
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
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
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
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
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
  "0x608060405234801561001057600080fd5b506040516118ea3803806118ea83398101604081905261002f916100b1565b61003833610061565b600280546001600160a01b0319166001600160a01b0393909316929092179091556003556100eb565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600080604083850312156100c457600080fd5b82516001600160a01b03811681146100db57600080fd5b6020939093015192949293505050565b6117f0806100fa6000396000f3fe608060405234801561001057600080fd5b506004361061010b5760003560e01c8063bd1ce2af116100a2578063ccc1a6bc11610071578063ccc1a6bc14610232578063ce8f60781461023b578063d8a531a61461025f578063e0aecae214610272578063f2fde38b1461029257600080fd5b8063bd1ce2af146101e6578063c19cc87a146101f9578063c8108cc11461020c578063c8e717911461021f57600080fd5b80635d27e9a6116100de5780635d27e9a614610182578063687d4a9b146101a6578063715018a6146101b95780638da5cb5b146101c157600080fd5b806311d42e301461011057806328220df5146101255780634ef5723d1461015c57806353b6b5ac1461016f575b600080fd5b61012361011e366004610f4a565b6102a5565b005b610149610133366004610f4a565b6000908152600160208190526040909120015490565b6040519081526020015b60405180910390f35b61012361016a366004610fac565b61040f565b61012361017d366004611059565b610675565b61018d601f60fa1b81565b6040516001600160f81b03199091168152602001610153565b6101236101b4366004610f4a565b61089c565b6101236108a9565b6000546001600160a01b03165b6040516001600160a01b039091168152602001610153565b6101236101f4366004611129565b6108bd565b61014961020736600461123b565b6109b9565b61012361021a36600461123b565b6109da565b61012361022d366004611272565b610c10565b61014960035481565b610149610249366004610f4a565b6001602081905260009182526040909120015481565b6002546101ce906001600160a01b031681565b610285610280366004610f4a565b610c3a565b60405161015391906112ba565b6101236102a0366004611272565b610d29565b6002546040516375ba902160e11b815260048101839052829160009182916001600160a01b03169063eb75204290602401600060405180830381865afa1580156102f3573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261031b9190810190611381565b505050509250509150336001600160a01b0316826001600160a01b03161461035e5760405162461bcd60e51b81526004016103559061143b565b60405180910390fd5b42811161037d5760405162461bcd60e51b81526004016103559061146a565b6000848152600160205260408120905b60038201548110156103e4578160000160008360030183815481106103b4576103b4611497565b906000526020600020015481526020019081526020016000206000905580806103dc906114c3565b91505061038d565b506103f3600382016000610e4c565b610401600282016000610e6a565b600060019091015550505050565b6002546040516375ba902160e11b8152600481018a90526000916001600160a01b03169063eb75204290602401600060405180830381865afa158015610459573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526104819190810190611381565b50505050505090506000600160008b8152602001908152602001600020600001600089896040516104b39291906114dc565b60405180910390208152602001908152602001600020549050600060018a868660418181106104e4576104e4611497565b919091013560f81c90506104fc60206000898b6114ec565b61050591611516565b610513604060208a8c6114ec565b61051c91611516565b6040805160008152602081018083529590955260ff909316928401929092526060830152608082015260a0016020604051602081039080840390855afa15801561056a573d6000803e3d6000fd5b505050602060405103519050826001600160a01b0316816001600160a01b0316146105d75760405162461bcd60e51b815260206004820152601760248201527f4541533a207369676e6174757265206d69736d617463680000000000000000006044820152606401610355565b60008989601f60fa1b8a8a601f60fa1b8b8b604051602001610600989796959493929190611534565b6040516020818303038152906040528051906020012090508083146106675760405162461bcd60e51b815260206004820152601860248201527f4541533a20636f6d6d69746d656e74206d69736d6174636800000000000000006044820152606401610355565b505050505050505050505050565b6002546040516375ba902160e11b815260048101879052869160009182916001600160a01b03169063eb75204290602401600060405180830381865afa1580156106c3573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526106eb9190810190611381565b505050509250509150336001600160a01b0316826001600160a01b0316146107255760405162461bcd60e51b81526004016103559061143b565b4281116107445760405162461bcd60e51b81526004016103559061146a565b856107915760405162461bcd60e51b815260206004820152601760248201527f4541533a20696e76616c696420636f6d6d69746d656e740000000000000000006044820152606401610355565b6000888152600160208190526040909120600354918101549091118015906107c55750600088815260208290526040902054155b156108125760405162461bcd60e51b815260206004820152601960248201527f4541533a206578636565646564206d61784e756d416c696173000000000000006044820152606401610355565b60008881526020829052604090205461088357600181600101600082825461083a9190611578565b909155505060038101805460018101825560009182526020909120018890558415610883576002810180546001810182556000918252602090912001610881868883611610565b505b6000978852602052505060409094209290925550505050565b6108a4610da2565b600355565b6108b1610da2565b6108bb6000610dfc565b565b6002546040516375ba902160e11b815260048101849052839160009182916001600160a01b03169063eb75204290602401600060405180830381865afa15801561090b573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526109339190810190611381565b505050509250509150336001600160a01b0316826001600160a01b03161461096d5760405162461bcd60e51b81526004016103559061143b565b42811161098c5760405162461bcd60e51b81526004016103559061146a565b600085815260016020908152604090912085516109b192600290920191870190610e88565b505050505050565b60008281526001602090815260408083208484529091529020545b92915050565b6002546040516375ba902160e11b815260048101849052839160009182916001600160a01b03169063eb75204290602401600060405180830381865afa158015610a28573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610a509190810190611381565b505050509250509150336001600160a01b0316826001600160a01b031614610a8a5760405162461bcd60e51b81526004016103559061143b565b428111610aa95760405162461bcd60e51b81526004016103559061146a565b60008581526001602090815260408083208784529182905290912054610b115760405162461bcd60e51b815260206004820152601860248201527f4541533a20616c726561647920646561637469766174656400000000000000006044820152606401610355565b6001816001016000828254610b2691906116d1565b909155505060008581526020829052604081208190556003820154905b6003830154811015610b8f5786836003018281548110610b6557610b65611497565b906000526020600020015403610b7d57809150610b8f565b80610b87816114c3565b915050610b43565b50600382018054610ba2906001906116d1565b81548110610bb257610bb2611497565b9060005260206000200154826003018281548110610bd257610bd2611497565b60009182526020909120015560038201805480610bf157610bf16116e4565b6001900381819060005260206000200160009055905550505050505050565b610c18610da2565b600280546001600160a01b0319166001600160a01b0392909216919091179055565b606060016000838152602001908152602001600020600201805480602002602001604051908101604052809291908181526020016000905b82821015610d1e578382906000526020600020018054610c919061158b565b80601f0160208091040260200160405190810160405280929190818152602001828054610cbd9061158b565b8015610d0a5780601f10610cdf57610100808354040283529160200191610d0a565b820191906000526020600020905b815481529060010190602001808311610ced57829003601f168201915b505050505081526020019060010190610c72565b505050509050919050565b610d31610da2565b6001600160a01b038116610d965760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610355565b610d9f81610dfc565b50565b6000546001600160a01b031633146108bb5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610355565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b5080546000825590600052602060002090810190610d9f9190610ede565b5080546000825590600052602060002090810190610d9f9190610ef3565b828054828255906000526020600020908101928215610ece579160200282015b82811115610ece5782518290610ebe90826116fa565b5091602001919060010190610ea8565b50610eda929150610ef3565b5090565b5b80821115610eda5760008155600101610edf565b80821115610eda576000610f078282610f10565b50600101610ef3565b508054610f1c9061158b565b6000825580601f10610f2c575050565b601f016020900490600052602060002090810190610d9f9190610ede565b600060208284031215610f5c57600080fd5b5035919050565b60008083601f840112610f7557600080fd5b50813567ffffffffffffffff811115610f8d57600080fd5b602083019150836020828501011115610fa557600080fd5b9250929050565b60008060008060008060008060a0898b031215610fc857600080fd5b8835975060208901359650604089013567ffffffffffffffff80821115610fee57600080fd5b610ffa8c838d01610f63565b909850965060608b013591508082111561101357600080fd5b61101f8c838d01610f63565b909650945060808b013591508082111561103857600080fd5b506110458b828c01610f63565b999c989b5096995094979396929594505050565b60008060008060006080868803121561107157600080fd5b853594506020860135935060408601359250606086013567ffffffffffffffff81111561109d57600080fd5b6110a988828901610f63565b969995985093965092949392505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff811182821017156110f9576110f96110ba565b604052919050565b600067ffffffffffffffff82111561111b5761111b6110ba565b50601f01601f191660200190565b600080604080848603121561113d57600080fd5b8335925060208085013567ffffffffffffffff8082111561115d57600080fd5b818701915087601f83011261117157600080fd5b813581811115611183576111836110ba565b8060051b6111928582016110d0565b918252838101850191858101908b8411156111ac57600080fd5b86860192505b83831015611229578235858111156111ca5760008081fd5b8601603f81018d136111dc5760008081fd5b878101356111f16111ec82611101565b6110d0565b8181528e8b8385010111156112065760008081fd5b818b84018b83013760009181018a019190915283525091860191908601906111b2565b80985050505050505050509250929050565b6000806040838503121561124e57600080fd5b50508035926020909101359150565b6001600160a01b0381168114610d9f57600080fd5b60006020828403121561128457600080fd5b813561128f8161125d565b9392505050565b60005b838110156112b1578181015183820152602001611299565b50506000910152565b6000602080830181845280855180835260408601915060408160051b870101925083870160005b8281101561132757878503603f1901845281518051808752611308818989018a8501611296565b601f01601f1916959095018601945092850192908501906001016112e1565b5092979650505050505050565b600082601f83011261134557600080fd5b81516113536111ec82611101565b81815284602083860101111561136857600080fd5b611379826020830160208701611296565b949350505050565b600080600080600080600060e0888a03121561139c57600080fd5b87516113a78161125d565b80975050602088015195506040880151945060608801519350608088015167ffffffffffffffff808211156113db57600080fd5b6113e78b838c01611334565b945060a08a01519150808211156113fd57600080fd5b6114098b838c01611334565b935060c08a015191508082111561141f57600080fd5b5061142c8a828b01611334565b91505092959891949750929550565b60208082526015908201527422a0a99d103737ba103237b6b0b4b71037bbb732b960591b604082015260600190565b602080825260139082015272115054ce88191bdb585a5b88195e1c1a5c9959606a1b604082015260600190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b6000600182016114d5576114d56114ad565b5060010190565b8183823760009101908152919050565b600080858511156114fc57600080fd5b8386111561150957600080fd5b5050820193919092039150565b803560208310156109d457600019602084900360031b1b1692915050565b87898237600088820160ff60f81b808a1682528789600184013786166001918801918201528385600283013760009301600201928352509098975050505050505050565b808201808211156109d4576109d46114ad565b600181811c9082168061159f57607f821691505b6020821081036115bf57634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111561160b57600081815260208120601f850160051c810160208610156115ec5750805b601f850160051c820191505b818110156109b1578281556001016115f8565b505050565b67ffffffffffffffff831115611628576116286110ba565b61163c83611636835461158b565b836115c5565b6000601f84116001811461167057600085156116585750838201355b600019600387901b1c1916600186901b1783556116ca565b600083815260209020601f19861690835b828110156116a15786850135825560209485019460019092019101611681565b50868210156116be5760001960f88860031b161c19848701351681555b505060018560011b0183555b5050505050565b818103818111156109d4576109d46114ad565b634e487b7160e01b600052603160045260246000fd5b815167ffffffffffffffff811115611714576117146110ba565b61172881611722845461158b565b846115c5565b602080601f83116001811461175d57600084156117455750858301515b600019600386901b1c1916600185901b1785556109b1565b600085815260208120601f198616915b8281101561178c5788860151825594840194600190910190840161176d565b50858210156117aa5787850151600019600388901b60f8161c191681555b5050505050600190811b0190555056fea2646970667358221220031d4a9df948424380207ae684eb8534000c9f4840d26f025242ff3f1059197264736f6c63430008110033";

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

  override deploy(
    _dc: PromiseOrValue<string>,
    _maxNumAlias: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<EAS> {
    return super.deploy(_dc, _maxNumAlias, overrides || {}) as Promise<EAS>;
  }
  override getDeployTransaction(
    _dc: PromiseOrValue<string>,
    _maxNumAlias: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_dc, _maxNumAlias, overrides || {});
  }
  override attach(address: string): EAS {
    return super.attach(address) as EAS;
  }
  override connect(signer: Signer): EAS__factory {
    return super.connect(signer) as EAS__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): EASInterface {
    return new utils.Interface(_abi) as EASInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): EAS {
    return new Contract(address, _abi, signerOrProvider) as EAS;
  }
}
