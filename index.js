const Commander = require('commander');
const Hero = require('./hero');

async function main(){
    Commander
        .version('v1')
        .option("-i, --insert", "Insert a hero")
        .option("-u, --update", "Update a hero")
        .option("-d, --delete [value]", "Delete a hero by ID")
        .option("-s, --select [value]", "Select a hero by ID")
        .option("-n, --heroname [value]", "Name")
        .option("-p, --heropower [value]", "Power")
        .parse(process.argv);

        if (Commander.insert){
            const hero = new Hero(Commander) ;

            hero.showInfo();
        }
    }

main();

console.log(sum(10, 33))
