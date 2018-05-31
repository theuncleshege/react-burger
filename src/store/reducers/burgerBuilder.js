import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../../shared/utility";

const initialState = {
    ingredients: null,
    /*ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },*/
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
};

const addIngredient = (state, action) => {
    const addedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const updatedAddIngredients = updateObject(state.ingredients, addedIngredient);
    const updatedAddState = {
        ingredients: updatedAddIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    };
    return updateObject(state, updatedAddState);
};

const removeIngredient = (state, action) => {
    const removedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
    const updatedRemoveIngredients = updateObject(state.ingredients, removedIngredient);
    const updatedRemoveState = {
        ingredients: updatedRemoveIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    };
    return updateObject(state, updatedRemoveState);
};

const setIngredients = (state, action) => {
    return updateObject(state, {
        // ingredients: action.ingredients,
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
        },
        totalPrice: 4,
        error: false,
        building: false
    });
};

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, {
        // ingredients: action.ingredients,
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat,
        },
        totalPrice: 4,
        error: false
    });
};

const burgerBuilder = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            /*return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };*/
            return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            /*return updateObject(state, {
                error: true
            });*/
            return fetchIngredientsFailed(state, action);
        default:
            return state;
    }
};

export default burgerBuilder;