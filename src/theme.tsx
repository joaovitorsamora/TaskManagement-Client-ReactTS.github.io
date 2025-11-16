export const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme")
    return savedTheme ? savedTheme : "light"
}