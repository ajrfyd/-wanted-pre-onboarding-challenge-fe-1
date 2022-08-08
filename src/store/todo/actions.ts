export const MODIFY_TOGGLE = 'todo/MODIFY_TOGGLE' as const;
export const FORM_TOGGLE = 'todo/FORM_TOGGLE' as const;

export const modifyToggle = (id: string) => ({ type: MODIFY_TOGGLE, payload: id });

export const formToggle = () => ({ type: FORM_TOGGLE });