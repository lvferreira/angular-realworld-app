

export const username = function () {
    const email = Cypress.env('email')
    const user = email.split("@")[0].trim()
    // console.log(user); // Output: " example "
    return user
}