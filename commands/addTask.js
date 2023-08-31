import ora from "ora";
import chalk from "chalk";
import inquirer from "inquirer";
import Todos from "../schema/todoSchema.js";
import { connectDB, disconnectDB } from "../db/connectDB.js";

async function input() {
  const answers = await inquirer.prompt([
    { name: "name", message: "Enter name of the task:", type: "input" },
    {
      name: "detail",
      message: "Enter the details of the task:",
      type: "input",
    },
  ]);

  return answers;
}

const askQuestions = async () => {
  const todoArray = [];
  let loop = false;

  do {
    const userRes = await input();
    todoArray.push(userRes);

    const confirmQ = await inquirer.prompt([
      {
        name: "confirm",
        message: "Do you want to add more tasks?",
        type: "confirm",
      },
    ]);

    if (confirmQ.confirm) {
      loop = true;
    } else {
      loop = false;
    }
  } while (loop);

  return todoArray;
};

export default async function addTask() {
  try {
    const userResponse = await askQuestions();
    await connectDB();

    let spinner = ora("Creating the todo...").start();

    for (let i = 0; i < userResponse.length; i++) {
      const res = userResponse[i];
      await Todos.create(res);
    }

    spinner.stop();
    console.log(chalk.greenBright("Created the todos!"));

    await disconnectDB();
  } catch (error) {
    console.log("Something went wrong, Error: ", error);
    process.exit(1);
  }
}
