class Hero {
    constructor({ heroname, heropower}){
        this.name = heroname;
        this.power = heropower;
    }

    showInfo(){
        console.log(this);
    }
}

module.exports = Hero;