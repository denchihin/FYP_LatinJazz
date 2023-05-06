var artistryChain = artifacts.require('./artistrychain.sol');

contract('artistryChain', async accounts => {
  it("should create a Participant", async () => {
    let instance = await artistryChain.deployed();
    let participantId = await instance.addParticipant("A","passA","0xd954a8CFdC00ccf7e90d7b7f5b92b2eE45786847","Manufacturer");
    let participant = await instance.participants(0);
    assert.equal(participant[0], "A");
    assert.equal(participant[2], "Manufacturer");

    participantId = await instance.addParticipant("B","passB","0x050B06681bf3b7c735447d80dd2B2Ec85f747832","Supplier");
    participant = await instance.participants(1);
    assert.equal(participant[0], "B");
    assert.equal(participant[2], "Supplier");

    participantId = await instance.addParticipant("C","passC","0x665f3987348C2c4A02C97Bb6a6feDa21911e5b47","Consumer");
    participant = await instance.participants(2);
    assert.equal(participant[0], "C");
    assert.equal(participant[2], "Consumer");
  });

  it("should return Participant details", async () => {
    let instance = await artistryChain.deployed();
    let participantDetails = await instance.getParticipant(0);
    assert.equal(participantDetails[0], "A");

    instance = await artistryChain.deployed();
    participantDetails = await instance.getParticipant(1);
    assert.equal(participantDetails[0], "B");

    instance = await artistryChain.deployed();
    participantDetails = await instance.getParticipant(2);
    assert.equal(participantDetails[0], "C");
  })
});
