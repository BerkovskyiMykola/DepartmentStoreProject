import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
    // we init with resources
    resources: {
        en: {
            translations: {
                email: "Email",
                firstname: "First name",
                lastname: "Last name",
                password: "Password",
                SignUp: "Sign Up",
                Home: "Home",
                Profile: "Profile",
                LogOut: "LogOut",
                Login: "Login",
                role: "Role",
                Actions: "Actions",
                ListEmpty: "List is empty",
                Create: "Create",
                Edit: "Edit",
                Delete: "Delete",
                CreateBackup: "Create Backup",
                RestoreDatabase: "Restore Вatabase",
                Users: "Users",

                "This field is required!": "This field is required!",
                "This is not a valid email. Example: example@example.com": "This is not a valid email. Example: example@example.com",
                "The field must be between 2 and 30 characters.": "The field must be between 2 and 30 characters.",
                "The field must be between 10 and 256 characters.": "The field must be between 10 and 256 characters.",
                "The password must be between 8 and 18 characters.": "The password must be between 8 and 18 characters.",

                "Bad Request": "Bad Request",
                "Not Found": "Not Found",
                "User with such Email exists": "User with such Email exists",
                "Email or password is incorrect": "Email or password is incorrect",
                "One or more validation errors occurred.": "One or more validation errors occurred.",
            }
        },
        ua: {
            translations: {
                email: "Пошта",
                firstname: "Ім'я",
                lastname: "Прізвище",
                password: "Пароль",
                SignUp: "Зареєструватись",
                Home: "Домашня сторінка",
                Profile: "Профіль",
                LogOut: "Вийти",
                Login: "Ввійти",
                role: "Роль",
                Actions: "Дії",
                ListEmpty: "Список пустий",
                Create: "Створити",
                Edit: "Редагувати",
                Delete: "Видалити",
                CreateBackup: "Створити резервну копію",
                RestoreDatabase: "Відновити базу даних",
                Users: "Користувачі",

                "This field is required!": "Це поле необхідне!",
                "This is not a valid email. Example: example@example.com": "Це не валідна пошта. Наприклад: example@example.com",
                "The field must be between 2 and 30 characters.": "Поле має містити від 2 до 30 символів.",
                "The field must be between 10 and 256 characters.": "Поле має містити від 10 до 256 символів.",
                "The password must be between 8 and 18 characters.": "Пароль має містити від 8 до 18 символів.",

                "Bad Request": "Поганий запит",
                "Not Found": "Не знайдено",
                "User with such Email exists": "Користувач із такою електронною поштою існує",
                "Email or password is incorrect": "Електронна адреса або пароль неправильні",
                "One or more validation errors occurred.": "Сталася одна чи кілька помилок перевірки.",
            }
        }
    },
    fallbackLng: "en",
    debug: false,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
        escapeValue: false, // not needed for react!!
        formatSeparator: ","
    },

    react: {
        useSuspense: false,
    }
});

export default i18n;
