export const reducers = {
  setUserInfo: (state, action) => {
    const { name, value } = action.payload
    state.user[name] = value
  },
  logout: state => {
    state.user = null
    state.token = null
  }
}
