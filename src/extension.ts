// Copyright © 2020 Mike Krasnenkov <mkrasnenkov@gmail.com>
// This work is free. You can redistribute it and/or modify it under the
// terms of the Do What The Fuck You Want To Public License, Version 2,
// as published by Sam Hocevar. See the LICENSE file for more details.

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Extension "trainzscript" activated');

    let initCmd = vscode.commands.registerCommand('trainzscript.init', () => {
        vscode.window.showInformationMessage('TrainzScript init');
    });

    let taskProvider = vscode.tasks.registerTaskProvider('trainzscript', {
        provideTasks() {
            return getTrainzScriptTasks();
        },
        resolveTask(resolvingTask: vscode.Task): vscode.Task | undefined {
            return resolvingTask;
        }
    });

    context.subscriptions.push(initCmd, taskProvider);
}

// this method is called when your extension is deactivated
export function deactivate() {
    console.log('Extension "trainzscript" deactivated');
}

export enum TaskCommand {
    compile = 'compile', 
    install = 'install', 
    run = 'run'
}

export interface TaskDefinition extends vscode.TaskDefinition {
    type: 'trainzscript';
    command: TaskCommand;
}

function getTrainzScriptTasks(): Thenable<vscode.Task[]> {
    return new Promise((resolve, _) => {
        resolve([
            new vscode.Task(
                { type: 'trainzscript', command: TaskCommand.compile },
                vscode.TaskScope.Workspace,
                'Compile', 'trainzscript',
                new vscode.ShellExecution('echo "Hello World"')
            )
        ]);
    });
}