import {IBasePaginate, UUID} from "@/app/shared/types";
import {faker} from "@faker-js/faker";

export interface IBaseCocktail {
    id: UUID
    name: string,
    description: string,
    alcoholLevel: number,
    alcoholMaxLevel: number,
    alcoholMinLevel: number,
    picture: string,
    ingredients: IIngredient[],
}

export interface IIngredient {
    id: UUID,
    proportion: number,
    order: number,
    name: string,
    isAlcohol: boolean,
    alcoholDegree: number,
}

export interface ICocktailList {
    id?: UUID,
    cover?: string,
    title?: string,
    createdAt?: Date,
    view?: number,
    comment?: number,
    share?: number,
    favorite?: number,
    author?: {
        name?: string,
        avatarUrl?: string,
    }
    description?: string,
}
