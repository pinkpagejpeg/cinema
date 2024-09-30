export interface IActorState {
    actorsLoading: boolean,
    actorsError: string | null,
    actors: IActors | null
}

export interface IActors {
    docs: IActor[],
    total: number | null,
    limit: number | null,
    page: number | null,
    pages: number | null
}

export interface IActor {
    id: number | null,
    name: string | null,
    enName: string | null,
    photo: string | null,
    sex: string | null,
    age: number | null,
}