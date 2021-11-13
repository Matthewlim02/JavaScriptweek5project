class Character {
    constructor(name, role) {
       this.name = name;
       this.role = role; 
    }

    describe() {
        return `${this.name} role is ${this.role}.` ;
    }
}

class Game {
    constructor(name) {
        this.name = name;
        this.characters = [];
    }

    addCharacter(character) {
        if (player instanceof Character) {
            this.characters.push(character);
        }else {
            throw new Error(`You can only add a Character. Argument is not a Character: ${character}`);
        }
    }

    describe() {
        return `${this.name} has ${this.characters.length} characters.`;
    }
}

class Weapon {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }

    describe() {
        return `${this.name} type is ${this.type}.`;
    }
}

//This class will keep track of the weapon objects that the user has added to their inventory.
class Inventory {
    constructor(name) {
        this.name = name;
        this.weapons =[];
    }

    addWeapon(weapon) {
        if (weapon instanceof Weapon) {
            this.weapons.push(weapon)
        }else {
            throw new Error(`You can only add a Weapon. Argument is not a Weapon: ${weapon}`)
        }
    }

    describe() {
        return `${this.name} has ${this.weapons.length} weapons.`;
    }
}

//Provides the functionality to create new games and weapons as well as delete.
class Menu {
    constructor() {
        this.games = [];
        this.selectedGame = null;
        this.inventories = [];
        this.selectedInventory = null;
    }

    //Takes in the users input and runs the corresponding method to create, view, or delete weapons and games.
    start() {
        let selection = this.showMainMenuOptions();
        while (selection !=0) {
            switch (selection) {
                case '1': 
                    this.createGame();
                    break;
                case '2':
                    this.createInventory();
                    break;
                case '3':
                    this.viewGame();
                    break;
                case '4':
                    this.viewInventory();
                    break;
                case '5':
                    this.deleteGame();
                    break;
                case '6':
                    this.deleteInventory();
                    break;
                case '7':
                    this.displayGames();
                    break;
                default:
                    selection = 0;

            }
            selection = this.showMainMenuOptions();
        }

        alert('Sayonara!');
    }

    showMainMenuOptions() {
        return prompt(`
            0) Exit
            1) Create new game
            2) Create new inventory
            3) View game
            4) View inventory
            5) Delete game
            6) Delete inventory
            7) Display all games
        `)
    }

    showGameMenuOptions(gameInfo) {
        return prompt(`
            0) Back
            1) Create character
            2) Delete character
            -----------------------
            ${gameInfo}
        `);
    }

    showInventoryMenuOptions(inventoryInfo) {
        return prompt(`
            0) Back
            1) Create weapon
            2) Delete weapon
            -----------------------
            ${inventoryInfo}
        `);
    }

    displayGames() {
        let gameString = '';
        for (let i = 0; i < this.games.length; i++) {
            gameString += i + ') ' + this.games[i].name + '\n';
        }
        alert(gameString);
    }

    createGame() {
        let name = prompt('Enter name for new game:');
        this.games.push(new Game(name));
    }

    displayInventory() {
        let inventoryString = '';
        for (let i = 0; i < this.inventories.length; i++) {
            inventoryString += i + ') ' + this.inventories[i].name + '\n';
        }
        alert(inventoryString);
    }

    createInventory() {
        let name = prompt('Enter name for new inventory:');
        this.inventories.push(new Inventory(name));
    }

    viewGame() {
        let index = prompt('Enter the index of the game you want to view:');
        if(index > -1 && index < this.games.length) {
            this.selectedGame = this.games[index];
            let description = 'Game Name: ' + this.selectedGame.name + '\n';
            
            for (let i = 0; i < this.selectedGame.characters.length; i++) {
                description += i + ') ' + this.selectedGame.characters[i].name + ' - ' + this.selectedGame.characters[i].role + '\n';
            }

            let selection = this.showGameMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createCharacter();
                    break;
                case '2':
                    this.deleteCharacter();
            }
        }
    }

    viewInventory() {
        let index = prompt('Enter the index of the inventory you want to view:');
        if(index > -1 && index < this.inventories.length) {
            this.selectedInventory = this.inventories[index];
            let description = 'Inventory name: ' + this.selectedInventory.name + '\n';
            
            for (let i = 0; i < this.selectedInventory.weapons.length; i++) {
                description += i + ') ' + this.selectedInventory.weapons[i].name + ' - ' + this.selectedInventory.weapons[i].type + '\n';
            }

            let selection = this.showInventoryMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createWeapon();
                    break;
                case '2':
                    this.deleteWeapon();
            }
        }
    }

    deleteGame() {
        let index = prompt('Enter the index of the game you want to delete:');
        if (index > -1 && index < this.games.length) {
            this.games.splice(index, 1);
        }
    }

    createCharacter() {
        let name = prompt('Enter new character name:');
        let role = prompt('Enter role of new character:');
        this.selectedGame.characters.push(new Character(name, role));
    }

    deleteCharacter() {
        let index = prompt('Enter the index of the character you want to delete:');
        if (index > -1 && index < this.selectedGame.characters.length) {
            this.selectedGame.characters.splice(index, 1);
        }
    }

    deleteInventory() {
        let index = prompt('Enter the index of the inventory you want to delete:');
        if (index > -1 && index < this.inventories.length) {
            this.inventories.splice(index, 1);
        }
    }

    createWeapon() {
        let name = prompt('Enter new weapon name:');
        let type = prompt('Enter type of new weapon:');
        this.selectedInventory.weapons.push(new Weapon(name, type));
    }

    deleteWeapon() {
        let index = prompt('Enter the index of the weapon you want to delete:');
        if (index > -1 && index < this.selectedInventory.weapons.length) {
            this.selectedInventory.weapons.splice(index, 1);
        }
    }

}

let menu = new Menu();
menu.start();
