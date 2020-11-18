// Action object, p - payload
export interface IActionObject<P = any | null> {
    type: string,
    payload?: P
}

// Action creator, p - payload
export type IActionCreator<P = null> = (payload?: P) => IActionCreator<P>