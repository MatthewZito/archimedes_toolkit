const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require("fs");
let json = fs.readFileSync('_config.json');
let json_vars = JSON.parse(json);

// BOT BEHAVIOR
client.on('ready', () => {
    console.log(`Connected as ${client.user.tag}`)
})

client.on('message', (userTransmittedCommand) => {
    if (userTransmittedCommand.author == client.user) { // Prevent bot from responding to its own messages
        return
    }
    else if (userTransmittedCommand.content.startsWith("!")) {
        processCommand(userTransmittedCommand)
    }
})

// METHODS
const processCommand = (userTransmittedCommand) => {
    let fullCommand = userTransmittedCommand.content.substr(1) // sans bang
    let splitCommand = fullCommand.split(" ") // Split msg
    let primaryCommand = splitCommand[0] // first
    let arguments = splitCommand.slice(1) // args

    console.log(`Command received: ${primaryCommand}`)
    console.log(`Arguments: ${arguments}`) // There may not be any arguments

    if (primaryCommand == "heartbeat") {
        heartbeat(userTransmittedCommand)
    } 
    else if (primaryCommand == "countdown") {
        countdown(arguments, userTransmittedCommand)
    }
    else if (primaryCommand == "babygirl") {
        world(userTransmittedCommand)
    }
    else if (primaryCommand == "motto") {
        motto(userTransmittedCommand)
    }
    else {
        userTransmittedCommand.channel.send("Diagnostic recommended")
    }
}


const motto = (userTransmittedCommand) => {
    userTransmittedCommand.channel.send("Study! Study! Study!")
}

const world = (userTransmittedCommand) => {
    userTransmittedCommand.channel.send("In the whole, wide world!")
}

// fetch uptime
const heartbeat = (userTransmittedCommand) => {
    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    seconds.toFixed(2)
    let uptime = `${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`;
    userTransmittedCommand.channel.send(`Connected as ${client.user.tag}. Uptime: ${uptime}`)
}

// instantiate countdown, defaults to 10s
const countdown = (arguments, userTransmittedCommand) => {
    let seconds;
    if (arguments.length > 0) {
        seconds = arguments
    } 
    else {
        seconds = 5
    }
    interval = setInterval(() => {
        userTransmittedCommand.channel.send(`Time remaining: ${seconds}`)
        seconds--;
        if(seconds == 0){
            userTransmittedCommand.channel.send("Begin!")
            clearInterval(interval); 
        }
    },1000)
}

// const search = (arguments, userTransmittedCommand) => {
//     // google.resultsPerPage = 5;
//     console.log(arguments)
//     if (arguments.length > 1) {
//         search_str = arguments.join(" ")
//         console.log(search_str)
//     }
//     else {
//         search_str = arguments[0]
//     }
//     google(search_str, (err, res) => {
//         if (err) console.error(err) 
//         console.log(res)
//         for (var i = 0; i < res.links.length; ++i) {
//             var link = res.links[i];
//             // At this point, you should see your data and just have to format your embed
//             console.log(link.title + ' - ' + link.href)
//             console.log(link.description + "\n")
//         }
//     })
// }

client.login(json_vars.primary)