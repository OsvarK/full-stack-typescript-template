export const validatePassword = (password: string) => {
    var pattern = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
    if (!password || password.length === 0) return false;
    return pattern.test(password);
}