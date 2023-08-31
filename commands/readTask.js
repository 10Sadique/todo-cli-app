import ora from "ora";
import chalk from "chalk";
import Todos from "../schema/todoSchema.js";
import { connectDB, disconnectDB } from "../db/connectDB.js";

export default async function readTask() {
  try {
    await connectDB();
    const spinner = ora("Fetching all todos...").start();

    const todos = await Todos.find({});

    spinner.stop();

    if (todos.length === 0) {
      console.log(chalk.blueBright("You do not have any tasks yet!"));
    } else {
      todos.forEach((todo) => {
        console.log(
          chalk.cyanBright("Todo Code: ") +
            todo.code +
            "\n" +
            chalk.blueBright("Name: ") +
            todo.name +
            "\n" +
            chalk.yellowBright("Description: ") +
            todo.detail +
            "\n"
        );
      });
    }

    await disconnectDB();
  } catch (error) {
    console.log("Something went wrong, Error: ", error);
    process.exit(1);
  }
}
