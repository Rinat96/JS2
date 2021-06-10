function getCost(item) {
    switch (item) {
        case "Большой": 
            costItem = 100;
            break;
        case "Маленький": 
            costItem = 50;
            break;
        case "Сыр": 
            costItem = 10;
            break;
        case "Салат": 
            costItem = 20;
            break;
        case "Картофель": 
            costItem = 15;
            break;
        case "Майонез": 
            costItem = 20;
            break;
        case "Специи": 
            costItem = 15;
            break;
        default:
            costItem = 0;
    }
        return costItem;
}

function getCalories(item) {
    switch (item) {
        case "Большой": 
            caloriesItem = 40;
            break;
        case "Маленький": 
            caloriesItem = 20;
            break;
        case "Сыр": 
            caloriesItem = 20;
            break;
        case "Салат": 
            caloriesItem = 5;
            break;
        case "Картофель": 
            caloriesItem = 10;
            break;
        case "Майонез": 
            caloriesItem = 5;
            break;
        case "Специи": 
            caloriesItem = 0;
            break;
            default: caloriesItem = 0;
    }
    return caloriesItem;
}

class Gamburger {
    constructor (size, staffing, sauce, spice){
        this.size = size;
        this.staffing = staffing;
        this.sauce = sauce;
        this.spice = spice;
    }
    getTotalCost (){
        let totalCost = 0;
        for (let key in this) {
            if(this.hasOwnProperty(key)){
            totalCost += getCost(this[key]);
            }
        }
        return totalCost;
    }
    getTotalCalories (){
        let totalCalories = 0;
        for (let key in this) {
            if(this.hasOwnProperty(key)){
            totalCalories += getCalories(this[key]);
            }
        }
        return totalCalories;
    }

    getChecked() {
        let selectedCheckBoxes = document.querySelectorAll('input:checked');
        let checkedValues = Array.from(selectedCheckBoxes).map(cb => cb.value);
        let i = 0;
        for (let key in this) {
            if(this.hasOwnProperty(key)){
            this[key] = checkedValues[i++];
            }
        }   
    }
}

function getShow(cost, calories){
    let par = document.querySelector('.total');
    par.innerHTML = `Стоимость - ${cost}  Калорий - ${calories}`;
}

let myGamburger = new Gamburger();

const init = () => {

    document.querySelector(".cart-button").onclick = function(){
        myGamburger.getChecked();
        getShow(myGamburger.getTotalCost(), myGamburger.getTotalCalories());
    };
};

window.onload = init;