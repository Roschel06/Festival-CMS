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
            default:
                throw new Error(`No case for ${action.type} found in AppContext`)
        }
    }

    const [state, dispatch] = useReducer(reducer, {
        user: {
            role: ''
        }
    })

    return <AppContext.Provider value={{state, dispatch}}>
        {children}
    </AppContext.Provider>
}