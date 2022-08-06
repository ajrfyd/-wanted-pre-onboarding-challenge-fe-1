export const NEED_SIGN_UP = 'login_NEED_SIGN_UP' as const;
export const NEED_LOG_IN = 'login_NEED_LOG_IN'as const;

export const REQ_LOG_IN = 'login_REQ_LOG_IN'as const;
export const REQ_LOG_OUT = 'login_REQ_LOG_OUT' as const;

export const OPEN_MODAL = 'login_OPEN_MODAL'as const;
export const CLOSE_MODAL = 'login_CLOSE_MODAL' as const;

export const needSignup = () => ({ type: NEED_SIGN_UP });
export const needLogin = () => ({ type: NEED_LOG_IN });
export const reqLogin = (email: string) => ({ type: REQ_LOG_IN, payload: email });
export const reqLogout = () => ({ type: REQ_LOG_OUT });

export const openModal = () => ({ type: OPEN_MODAL });
export const closeModal = () => ({ type: CLOSE_MODAL });