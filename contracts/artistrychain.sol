//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract artistryChain {
    uint32 artwork_id = 0; // artworks ID
    uint32 participant_id =23800;  // Participant ID
    uint32 owner_id =0; //Ownership ID
    uint geneDigits = 16;
    uint geneModulus = 10 ** geneDigits;

    event NewParticipant(uint32 userId);
    event TransferOwnership(uint32 artworkId);

    struct artwork {
        string artworkName;
        string serialNumber;
        address artworkOwner;
        uint32 cost;
        uint32 atyTimeStamp;
        uint gene;
    }
    mapping(uint32 => artwork) public artworks; //mapping artwork_ID to the artwork

    struct participant {
        string userName;
        string password;
        string participantType;
        address participantAddress;
        uint partGene;
    }
    mapping(uint32 => participant) public participants; // mapping participants_ID to the participants

    struct ownership {
        uint32 artwork_Id;
        uint32 ownerId;
        uint32 trdTimeStamp;
        address artworkOwner;
    }
    mapping(uint32 => ownership) public ownerships;      //ownerships ownership ID
    mapping(uint32 => uint32[]) public artworkTrack;     //ownerships by arwotk_Id to track the artwork history


    function addParticipant(string memory _name, string memory _pass, address _pAdd, string memory _pType) public returns (uint32){
        uint randGene = _generateRandomGene(_name);
        randGene = randGene - randGene % 100;
        uint32 userId = participant_id++;
        participants[userId].userName = _name;
        participants[userId].password = _pass;
        participants[userId].participantAddress = _pAdd;
        participants[userId].participantType = _pType;
        participants[userId].partGene = randGene;
        emit NewParticipant(userId);
        return userId;
    }

    function getParticipant(uint32 _participant_id) public view returns (string memory,address,string memory) {
        return (participants[_participant_id].userName,
                participants[_participant_id].participantAddress,
                participants[_participant_id].participantType);
    }

    function _generateRandomGene(string memory _str) private view returns (uint){
    uint rand = uint(keccak256(abi.encodePacked(_str)));
    return rand % geneModulus;
    }

    function addArtwork(uint32 _ownerId,
                        string memory _artworkName,
                        string memory _serialNumber,
                        uint32 _productCost) public returns (uint32) {

        if(keccak256(abi.encodePacked(participants[_ownerId].participantType)) == keccak256("Manufacturer")) {
            uint randGene = _generateRandomGene(_artworkName);
            randGene = randGene - randGene % 100;
            uint32 artworkId = artwork_id++;
            artworks[artworkId].artworkName = _artworkName;
            artworks[artworkId].serialNumber = _serialNumber;
            artworks[artworkId].cost = _productCost;
            artworks[artworkId].artworkOwner = participants[_ownerId].participantAddress;
            artworks[artworkId].atyTimeStamp = uint32(block.timestamp);
            artworks[artworkId].gene = randGene;
            return artworkId;
        }
       return 0;
    }

    function getArtwork(uint32 _artId) public view returns ( string memory, string memory, uint32, address, uint32, uint){
        return( artworks[_artId].artworkName,
                artworks[_artId].serialNumber,
                artworks[_artId].cost,
                artworks[_artId].artworkOwner,
                artworks[_artId].atyTimeStamp,
                artworks[_artId].gene);
    }

    modifier onlyOwner(uint32 _artworkId) {
         require(msg.sender == artworks[_artworkId].artworkOwner,"");
         _;

    }

    function newOwner(uint32 _user1Id,uint32 _user2Id, uint32 _artId) onlyOwner(_artId) public returns (bool) {
        participant memory p1 = participants[_user1Id];
        participant memory p2 = participants[_user2Id];
        uint32 ownership_id = owner_id++;

        if(keccak256(abi.encodePacked(p1.participantType)) == keccak256("Manufacturer")
            && keccak256(abi.encodePacked(p2.participantType))==keccak256("Supplier")){
            ownerships[ownership_id].artwork_Id = _artId;
            ownerships[ownership_id].artworkOwner = p2.participantAddress;
            ownerships[ownership_id].ownerId = _user2Id;
            ownerships[ownership_id].trdTimeStamp = uint32(block.timestamp);
            artworks[_artId].artworkOwner = p2.participantAddress;
            uint _newGene = (p2.partGene + artworks[_artId].gene) / 2;
            _newGene = _newGene - _newGene % 100 + 99;
            artworks[_artId].gene = _newGene;
            artworkTrack[_artId].push(ownership_id);
            emit TransferOwnership(_artId);

            return (true);
        }
        else if(keccak256(abi.encodePacked(p1.participantType)) == keccak256("Supplier") && keccak256(abi.encodePacked(p2.participantType))==keccak256("Supplier")){
            ownerships[ownership_id].artwork_Id = _artId;
            ownerships[ownership_id].artworkOwner = p2.participantAddress;
            ownerships[ownership_id].ownerId = _user2Id;
            ownerships[ownership_id].trdTimeStamp = uint32(block.timestamp);
            artworks[_artId].artworkOwner = p2.participantAddress;
            uint _newGene = (p2.partGene + artworks[_artId].gene) / 2;
            _newGene = _newGene - _newGene % 100 + 88;
            artworks[_artId].gene = _newGene;
            artworkTrack[_artId].push(ownership_id);
            emit TransferOwnership(_artId);

            return (true);
        }
        else if(keccak256(abi.encodePacked(p1.participantType)) == keccak256("Supplier") && keccak256(abi.encodePacked(p2.participantType))==keccak256("Consumer")){
            ownerships[ownership_id].artwork_Id = _artId;
            ownerships[ownership_id].artworkOwner = p2.participantAddress;
            ownerships[ownership_id].ownerId = _user2Id;
            ownerships[ownership_id].trdTimeStamp = uint32(block.timestamp);
            artworks[_artId].artworkOwner = p2.participantAddress;
            uint _newGene = (p2.partGene + artworks[_artId].gene) / 2;
            _newGene = _newGene - _newGene % 100 + 88;
            artworks[_artId].gene = _newGene;
            artworkTrack[_artId].push(ownership_id);
            emit TransferOwnership(_artId);

            return (true);
        }

        return (false);
    }

    function getProvenance(uint32 _artworkId) external view returns (uint32[] memory) {

       return artworkTrack[_artworkId];
    }

    function getOwnership(uint32 _regId)  public view returns (uint32,uint32,address,uint32) {

        ownership memory r = ownerships[_regId];

         return (r.artwork_Id,r.ownerId,r.artworkOwner,r.trdTimeStamp);
    }

    function authenticateParticipant(uint32 _uid,
                                    string memory _uname,
                                    string memory _pass,
                                    string memory _utype) public view returns (bool){
        if(keccak256(abi.encodePacked(participants[_uid].participantType)) == keccak256(abi.encodePacked(_utype))) {
            if(keccak256(abi.encodePacked(participants[_uid].userName)) == keccak256(abi.encodePacked(_uname))) {
                if(keccak256(abi.encodePacked(participants[_uid].password)) == keccak256(abi.encodePacked(_pass))) {
                    return (true);
                }
            }
        }

        return (false);
    }

}