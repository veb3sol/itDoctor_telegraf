const { Telegraf, Markup } = require('telegraf')
const { message } = require('telegraf/filters')
const text = require('./const')

require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}`))
bot.help((ctx) => ctx.reply(text.comman))

//функции асинхронные потому что кнопки могут выводится непоследовательно
bot.command('course', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>Курсы</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Редакторы', 'btn_1'), Markup.button.callback('JS', 'btn_2')],
                [Markup.button.callback('Обзоры', 'btn_3'), Markup.button.callback('HTML', 'btn_4')]
            ]
        ))
    } catch (error) {
        console.log(error)
    }
   
})

bot.action('btn_1', async (ctx) => {
    try {
        ctx.replyWithHTML('Обработка кнопки 1', {
            disable_web_page_preview: true
        })
    } catch (error) {
        
    }
})


bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))