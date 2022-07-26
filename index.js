const Discord = require('discord.js');
const client = new Discord.Client()
const { MessageButton } = require('discord-buttons')
const disbut = require('discord-buttons');
disbut(client);
const managerrole = 'managerroleid'
const staffrole = 'staffroleid'
const category = 'categoryid'
const logschannel = 'logschannelid'


client.on('ready', () => {
    console.log('ready')
})

client.on('message', async (message) => {
    if (message.author.bot) return;
        if (message.content === '!ticket') {
            if (message.member.permissions.has('ADMINISTRATOR')) {
            message.delete()
            const embed = new Discord.MessageEmbed()
            .setAuthor('ticket system', 'https://media.discordapp.net/attachments/977498267518652447/1000087672980779028/ticket.png')
            .setTitle('Marouakos Ticket')
            .setDescription('To create a ticket perss ``📨Create Ticket`` button.')
            .setColor('#17ff00')
            .setFooter('marouakos ticket', 'https://media.discordapp.net/attachments/977498267518652447/1000087672980779028/ticket.png')
            .setTimestamp()
            const button = new MessageButton()
            .setID('open-ticket')
            .setStyle('gray')
            .setLabel('Create Ticket')
            .setEmoji('\📨')
            const btns = [button]
            message.channel.send({embed: embed, buttons: btns})
    }
})

client.on('clickButton', async (button) => {
    if (button.id === 'open-ticket') {
        const ch = button.guild.channels.cache.find(ch => ch.name === `ticket-${button.clicker.user.username}`)
        if(ch) return button.reply.send('**Έχεις ενα ticket ανοικτό**', true)
        button.reply.send('**To ticket άνοιξε!**', true)
        const kanali = await   button.guild.channels.create(`ticket-${button.clicker.user.username}`, {
            type: "text",
            topic: `${button.clicker.user.id}`,
            parent: category,
            
                permissionOverwrites: [
                   {
                   id: button.guild.roles.everyone, 
                   deny: ['VIEW_CHANNEL', 'SEND_MESSAGES'] 
                   },
                  
                  {
                    id: button.clicker.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                 },
                 {
                    id: managerrole,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                 },
                 {
                    id: staffrole,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                 },
                ],
                })
                const embed = new Discord.MessageEmbed()
                .setAuthor('ticket system', 'https://media.discordapp.net/attachments/977498267518652447/1000087672980779028/ticket.png')
                .setTitle(`Τhe ticket opened by: ${button.clicker.user.tag}`)
                .setDescription(`<@${button.clicker.id}> Pls wait for staff team to support you. If you want to close your ticket press \`\`🔒Close\`\``)
                .setFooter('marouakos ticket', 'https://media.discordapp.net/attachments/977498267518652447/1000087672980779028/ticket.png')
                .setColor('#17ff00')
                .setTimestamp()
                const close = new MessageButton()
                .setID('close-ticket')
                .setStyle('red')
                .setEmoji('🔒')
                .setLabel('Close')
                const buttons = [close]
                await kanali.send({embed: embed, buttons: buttons})
    }
    if (button.id === 'close-ticket') {
        const deleteticket = new MessageButton()
        .setID('delete-ticket')
        .setStyle('red')
        .setLabel('Delete')
        .setEmoji('⛔')
        const cancelticket = new MessageButton()
        .setID('cancel-ticket')
        .setStyle('gray')
        .setLabel('Cancel')
        .setEmoji('\❌')
        const buttons = [deleteticket, cancelticket]
        button.reply.defer()
        button.channel.send('Are you sure you would like to close this ticket?', {buttons: buttons})
    }
    if (button.id === 'delete-ticket') {
        button.channel.delete()
        const logs = new Discord.MessageEmbed()
        .setAuthor('ticket system', 'https://media.discordapp.net/attachments/977498267518652447/1000087672980779028/ticket.png')
        .setTitle('Ticket Logs')
        .setDescription(`**Έκλεισε απο: <@${button.clicker.id}>\nΚαναλι: \`\`ticket-${button.clicker.user.username}\`\`**`)
        .setColor('#2F3136')
        .setFooter('marouakos ticket', 'https://media.discordapp.net/attachments/977498267518652447/1000087672980779028/ticket.png')
        .setTimestamp()
        button.message.guild.channels.cache.get(logschannel).send(logs)
    }
    if (button.id === 'cancel-ticket') {
        button.message.delete()
        button.reply.defer()
        button.channel.send('✅the ticket was canceled').then(message => {
            setTimeout(() => message.delete(), 5000)
        })
    }
})

client.login("token")
