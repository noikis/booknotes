import colors from "colors";

export const printInfo = (message: string) => {
  console.log(colors.green(message));
};

export const printError = (message: string) => {
  console.log(colors.red(message));
};
