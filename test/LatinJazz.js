const LatinJazz = artifacts.require("ArtistryFactory");
const utils = require("./helpers/utils");
const artworks = ("The Starry Night","The Scream");
var expect = require('chai').expect;
contract("ArtistryFactory", (accounts) => {
    let [alice, bob] = accounts;
    let contractInstance;
    beforeEach(async () => {
        contractInstance = await LatinJazz.new();
    });
    it("should be able to create a artwork", async () => {
        const result = await contractInstance.createNewArtwork(artworks[0], {from: alice});
        expect(result.receipt.status).to.equal(true);
        expect(result.logs[0].args.name).to.equal(artworks[0]);
    })
});
