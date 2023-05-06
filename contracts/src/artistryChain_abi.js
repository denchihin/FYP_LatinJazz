[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint32",
				"name": "artworkId",
				"type": "uint32"
			}
		],
		"name": "TransferOwnership",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "_ownerId",
				"type": "uint32"
			},
			{
				"internalType": "string",
				"name": "_artworkName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_serialNumber",
				"type": "string"
			},
			{
				"internalType": "uint32",
				"name": "_productCost",
				"type": "uint32"
			}
		],
		"name": "addArtwork",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_pass",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_pAdd",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_pType",
				"type": "string"
			}
		],
		"name": "addParticipant",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "artworkTrack",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"name": "artworks",
		"outputs": [
			{
				"internalType": "string",
				"name": "artworkName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "serialNumber",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "artworkOwner",
				"type": "address"
			},
			{
				"internalType": "uint32",
				"name": "cost",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "atyTimeStamp",
				"type": "uint32"
			},
			{
				"internalType": "uint256",
				"name": "gene",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "_uid",
				"type": "uint32"
			},
			{
				"internalType": "string",
				"name": "_uname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_pass",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_utype",
				"type": "string"
			}
		],
		"name": "authenticateParticipant",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "_artId",
				"type": "uint32"
			}
		],
		"name": "getArtwork",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "_regId",
				"type": "uint32"
			}
		],
		"name": "getOwnership",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "_participant_id",
				"type": "uint32"
			}
		],
		"name": "getParticipant",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "_artworkId",
				"type": "uint32"
			}
		],
		"name": "getProvenance",
		"outputs": [
			{
				"internalType": "uint32[]",
				"name": "",
				"type": "uint32[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "_user1Id",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "_user2Id",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "_artId",
				"type": "uint32"
			}
		],
		"name": "newOwner",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"name": "ownerships",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "artwork_Id",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "ownerId",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "trdTimeStamp",
				"type": "uint32"
			},
			{
				"internalType": "address",
				"name": "artworkOwner",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"name": "participants",
		"outputs": [
			{
				"internalType": "string",
				"name": "userName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "password",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "participantType",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "participantAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "partGene",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]