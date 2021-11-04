export interface SidebarCollapsedAction {
    type: "SIDEBAR_SET" | "SIDEBAR_OP";
    payload: boolean;
}

export const sidebarCollapsed = (state: boolean | undefined, action: SidebarCollapsedAction): boolean => {
    console.log(state, action)
    if (state === undefined) {
        return true;
    }
    switch (action.type) {
        case "SIDEBAR_OP":
            return !state;
        case "SIDEBAR_SET":
            return action.payload;
    }
};
