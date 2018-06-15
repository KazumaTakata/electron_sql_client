
const electron = require("electron");
require('electron-reload')(__dirname);
const url = require("url");
const path = require("path");

const { default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } = require('electron-devtools-installer');

installExtension(REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS )
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
// installExtension( REACT_DEVELOPER_TOOLS )
// .then((name) => console.log(`Added Extension:  ${name}`))
// .catch((err) => console.log('An error occurred: ', err));

// installExtension(REACT_DEVELOPER_TOOLS)
//     .then((name) => console.log(`Added Extension:  ${name}`))
//     .catch((err) => console.log('An error occurred: ', err));

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

app.on("ready", function(){


        mainWindow = new BrowserWindow({});
        mainWindow.webContents.openDevTools();
        mainWindow.loadURL(url.format({
            pathname: path.join(__dirname, "dist", "index.html"),
            protocol: "file:",
            slashes: true
        }));
    
        // const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

        //  Menu.setApplicationMenu(mainMenu)

        var template = [{
            label: "Application",
            submenu: [
                { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
                { type: "separator" },
                { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
            ]}, {
            label: "Edit",
            submenu: [
                { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
                { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
                { type: "separator" },
                { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
                { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
                { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
                { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
            ]}
        ];
    
        Menu.setApplicationMenu(Menu.buildFromTemplate(template));


        })

const mainMenuTemplate = [
    {
        label: "File"
    }
];