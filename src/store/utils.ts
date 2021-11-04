import store from "."
const setSidebarCollapsed = (collapsed: boolean) => {
    store.dispatch({
        type: "SIDEBAR_SET",
        payload: collapsed,
    })
}

const opSidebarCollapsed = () => {
    store.dispatch({
        type: "SIDEBAR_OP",
        payload: true,
    })
}
export { setSidebarCollapsed, opSidebarCollapsed };