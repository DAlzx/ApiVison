// ce selector est utilisé avec le hook useSeletor
export const selectConnect = (state) => state.connect;
export const selectPostcode = (state) => state.postcode;
export const selectCity = (state) => state.city;
export const selectUsername = (state) => state.username;
export const selectEmail = (state) => state.email;
export const selectBirthday = (state) => state.birthday;
export const selectPassword = (state) => state.password;
export const selectPhone = (state) => state.phone;
// export const selectFreelances = (state) => state.freelances

// export const selectSurvey = (state) => state.survey

// const voidFreelance = { status: 'void' }

// export const selectFreelance = (freelanceId) => (state) => {
//   return state.freelance[freelanceId] ?? voidFreelance
// }

// export const selectResults = (state) => state.results
