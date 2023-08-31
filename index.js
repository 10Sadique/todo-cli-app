#!/usr/bin/env node

import { Command } from "commander";

import addTask from './commands/addTask.js';
import readTask from './commands/readTask.js';
import updateTask from './commands/updateTask.js';
import deleteTask from './commands/deleteTask.js'

const program = new Command();

program
  .name("todo")
  .description("Your terminal task manager!")
  .version("1.0.0");

program.name("add").description("Create a new todo.").action(addTask);

program.name("read").description("Reads all the todo.").action(readTask);

program.name("update").description("Updates a todo.").action(updateTask);

program.name("delete").description("Deletes a todo.").action(deleteTask);

program.parse();
