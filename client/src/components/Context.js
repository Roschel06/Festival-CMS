import { createContext, useReducer } from "react"

export const AppContext = createContext()

export default function ContextProvider({children}) {

    const reducer = (state, action) => {

        switch (action.type) {

            case ('login'):
                return {
                    ...state,
                    user: action.payload
                }

            case 'logout':

                return {
                    user: {}
                }

/*             case ('festival'):
                return {
                    ...state,
                    festival: action.payload
                } */
            default:
                return
        }
    }

    const [state, dispatch] = useReducer(reducer, {
        user: {}
    })

    return <AppContext.Provider value={{state, dispatch}}>
        {children}
    </AppContext.Provider>
}