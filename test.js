const { deepEqual, ok } = require('assert');
const { done } = require('xstate/lib/actions');
const { JSONFile } = require('./jsonfile');

// Heroes to test.
// Use some reserved id's
const flash = { id: 1, name: "Flash", power: "speed" };
const batman = { id: 2, name: "Batman", power: "knowledge" };
const superman = { id: 3, name: "Superman", power: "superpower" };
const greenlantern = { id: 4, name: "Green Lantern", power: "ring power" };
const ironman = { id: 5, name: "Iron Man", power: "genius" };

const listHeroes = [
    flash,
    batman,
    superman,
    // greenlantern,
    // ironman
];

describe("Suite de testes de heróis", () => {

    let JSONFileHero = new JSONFile("./heroes.json");

    before(async () => {
        let result;

        result = await JSONFileHero.selectItem(flash.id);
        if (!result || result.length == 0)
            await JSONFileHero.insertItem(flash);

        result = await JSONFileHero.selectItem(batman.id);
        if (!result || result.length == 0)
            await JSONFileHero.insertItem(batman);

        result = await JSONFileHero.selectItem(superman.id);
        if (!result || result.length == 0)
            await JSONFileHero.insertItem(superman);

     })

    it("Lista todos os heróis de testes", async () => {
        const expected = listHeroes;
        const heroes = await JSONFileHero.selectItem();
        deepEqual(heroes, expected);
    })

    it("Adiciona um herói", async () => {
        const expected = greenlantern;
        const hero = await JSONFileHero.insertItem(greenlantern);

        deepEqual(hero, expected);
    })

    it("Altera um herói", async () => {
        const expected = greenlantern;

        expected.power = "super power of ring";
        const hero = await JSONFileHero.updateItem(greenlantern.id, expected);

        deepEqual(hero, expected);
    })

    it("Verifica se existe herói existe", async () => {
         const expected = greenlantern;
         const [ hero ] = await JSONFileHero.selectItem(greenlantern.id);

         deepEqual(hero, expected);
    })

    it("Remove um herói do arquivo", async () => {
        const expected = greenlantern;
        const deleted = await JSONFileHero.deleteItem(greenlantern.id);


        deepEqual(deleted, expected);
    })
})