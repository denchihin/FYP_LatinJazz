//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract artistryTrack {
    uint32 artwork_id = 0; // artworks ID
	uint32 participant_id =0;  // Participant ID
    uint32 owner_id =0; //Ownership ID
    uint geneDigits = 16;
    uint geneModulus = 10 ** geneDigits;


    struct artwork {
        string artworkName;
        string serialNumber;
        address artworkOwner;
		uint32 artwork_id;
        uint32 cost;
        uint32 atyTimeStamp;
        uint gene;
    }
    mapping(uint32 => artwork) public artworks; //mapping barcode to artwork

    struct participant {
        string userName;
        string password;
        string participantType;
		uint32 participant_id;
        address participantAddress;
        uint partGene;
    }
    mapping(address => participant) public participants; // mapping address to participants_ID to the participants

    struct ownership {
        uint32 artBarcode;
        uint trdTimeStamp;
        address artworkOwner;
    }
    mapping(uint32 => ownership) public ownerships;      //ownerships ownership ID
    mapping(uint32 => uint32[]) public artworkTrack;     //ownerships by arwotk_Id to track the artwork history

    event TransferOwnership(uint32 artworkId);

    function addParticipant(string memory _name, string memory _pass, address _pAdd, string memory _pType) public returns (uint32){
        uint randGene = _generateRandomGene(_name);
        randGene = randGene - randGene % 100;
        uint32 userId = participant_id++;
        participants[_pAdd].userName = _name;
        participants[_pAdd].password = _pass;
		participants[_pAdd].participantType = _pType;
		participants[_pAdd].participant_id = userId;
        participants[_pAdd].participantAddress = _pAdd;
        participants[_pAdd].partGene = randGene;

        return userId;
    }

    function getParticipant(address _pAdd) public view returns (string memory,address,string memory,uint32,uint ) {
        return (participants[_pAdd].userName,
                participants[_pAdd].participantAddress,
                participants[_pAdd].participantType,
				participants[_pAdd].participant_id,
				participants[_pAdd].partGene);
    }

    function _generateRandomGene(string memory _str) private view returns (uint){
    uint rand = uint(keccak256(abi.encodePacked(_str)));
    return rand % geneModulus;
    }

    function addArtwork(address _pAdd,
						uint32 _barcode,
                        string memory _artworkName,
                        string memory _serialNumber,
                        uint32 _productCost) public returns (uint32) {

        if(keccak256(abi.encodePacked(participants[_pAdd].participantType)) == keccak256("Manufacturer")) {
            uint randGene = _generateRandomGene(_artworkName);
            randGene = randGene - randGene % 100;
            uint32 artworkId = artwork_id++;
            artworks[_barcode].artworkName = _artworkName;
            artworks[_barcode].serialNumber = _serialNumber;
			artworks[_barcode].artwork_id = artworkId;
            artworks[_barcode].cost = _productCost;
            artworks[_barcode].artworkOwner = participants[_pAdd].participantAddress;
            artworks[_barcode].atyTimeStamp = uint32 (block.timestamp);
            artworks[_barcode].gene = randGene;
            return artworkId;
        }
       return 0;
    }

    function getArtwork(uint32 _barcode) public view returns ( string memory, string memory, uint32, uint32, address, uint, uint){
        return( artworks[_barcode].artworkName,
                artworks[_barcode].serialNumber,
				artworks[_barcode].artwork_id,
                artworks[_barcode].cost,
                artworks[_barcode].artworkOwner,
                artworks[_barcode].atyTimeStamp,
                artworks[_barcode].gene);
    }

    modifier onlyOwner(uint32 _barcode) {
         require(msg.sender == artworks[_barcode].artworkOwner,"");
         _;

    }

    function newOwner(address _u1Address,address _u2Address, uint32 _barcode) onlyOwner(_barcode) public returns (bool) {
        participant memory p1 = participants[_u1Address];
        participant memory p2 = participants[_u2Address];
        uint32 ownership_id = owner_id++;

        if(keccak256(abi.encodePacked(p1.participantType)) == keccak256("Manufacturer")
            && keccak256(abi.encodePacked(p2.participantType))==keccak256("Supplier")){
            ownerships[ownership_id].artBarcode = _barcode;
            ownerships[ownership_id].artworkOwner = p2.participantAddress;
            ownerships[ownership_id].trdTimeStamp = uint(block.timestamp);
            artworks[_barcode].artworkOwner = p2.participantAddress;
            uint _newGene = (p2.partGene + artworks[_barcode].gene) / 2;
            _newGene = _newGene - _newGene % 100 + 99;
            artworks[_barcode].gene = _newGene;
            artworkTrack[_barcode].push(ownership_id);
            emit TransferOwnership(_barcode);

            return (true);
        }
        else if(keccak256(abi.encodePacked(p1.participantType)) == keccak256("Supplier") && keccak256(abi.encodePacked(p2.participantType))==keccak256("Supplier")){
            ownerships[ownership_id].artBarcode = _barcode;
            ownerships[ownership_id].artworkOwner = p2.participantAddress;
            ownerships[ownership_id].trdTimeStamp = uint(block.timestamp);
            artworks[_barcode].artworkOwner = p2.participantAddress;
            uint _newGene = (p2.partGene + artworks[_barcode].gene) / 2;
            _newGene = _newGene - _newGene % 100 + 88;
            artworks[_barcode].gene = _newGene;
            artworkTrack[_barcode].push(ownership_id);
            emit TransferOwnership(_barcode);

            return (true);
        }
        else if(keccak256(abi.encodePacked(p1.participantType)) == keccak256("Supplier") && keccak256(abi.encodePacked(p2.participantType))==keccak256("Consumer")){
            ownerships[ownership_id].artBarcode = _barcode;
            ownerships[ownership_id].artworkOwner = p2.participantAddress;
            ownerships[ownership_id].trdTimeStamp = uint(block.timestamp);
            artworks[_barcode].artworkOwner = p2.participantAddress;
            uint _newGene = (p2.partGene + artworks[_barcode].gene) / 2;
            _newGene = _newGene - _newGene % 100 + 77;
            artworks[_barcode].gene = _newGene;
            artworkTrack[_barcode].push(ownership_id);
            emit TransferOwnership(_barcode);

            return (true);
        }

        return (false);
    }

    function getProvenance(uint32 _barcode) external view returns (uint32[] memory) {

       return artworkTrack[_barcode];
    }

    function getOwnership(uint32 _regId)  public view returns (uint32,address,uint) {

        ownership memory r = ownerships[_regId];

         return (r.artBarcode,r.artworkOwner,r.trdTimeStamp);
    }

    function authenticateParticipant(address _pAdd,
                                    string memory _uname,
                                    string memory _pass,
                                    string memory _utype) public view returns (bool){
        if(keccak256(abi.encodePacked(participants[_pAdd].participantType)) == keccak256(abi.encodePacked(_utype))) {
            if(keccak256(abi.encodePacked(participants[_pAdd].userName)) == keccak256(abi.encodePacked(_uname))) {
                if(keccak256(abi.encodePacked(participants[_pAdd].password)) == keccak256(abi.encodePacked(_pass))) {
                    return (true);
                }
            }
        }

        return (false);
    }

}